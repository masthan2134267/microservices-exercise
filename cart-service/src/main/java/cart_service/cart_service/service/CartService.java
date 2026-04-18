package cart_service.cart_service.service;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.dto.ProductResponse;
import cart_service.cart_service.dto.StockCheckResponse;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.event.CartEvent;
import cart_service.cart_service.exception.InsufficientStockException;
import cart_service.cart_service.exception.ResourceNotFoundException;
import cart_service.cart_service.external.ProductClient;
import cart_service.cart_service.kafka.KafkaProducerService;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductClient productClient;
    private final KafkaProducerService kafkaProducerService;

    @Qualifier("cartTaskExecutor")
    private final Executor cartTaskExecutor;

    public Cart createCart(Cart cart) {
        log.info("Creating new cart for userId={}", cart.getUserId());
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts() {
        log.info("Fetching all carts");
        return cartRepository.findAll();
    }

    public Cart getCartById(Long id) {
        log.info("Fetching cart by id={}", id);
        return cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + id));
    }

    public Cart updateCart(Long id, Cart cart) {
        log.info("Updating cart with id={}", id);
        Cart existingCart = getCartById(id);
        existingCart.setUserId(cart.getUserId());
        Cart updatedCart = cartRepository.save(existingCart);
        log.info("Cart updated successfully with id={}", updatedCart.getId());
        return updatedCart;
    }

    public void deleteCart(Long id) {
        log.info("Deleting cart with id={}", id);
        Cart existingCart = getCartById(id);
        cartRepository.delete(existingCart);
        log.info("Cart deleted successfully with id={}", id);
    }

    public CartItem addProductToCart(AddToCartRequest request) {
        log.info("Add to cart request received: cartId={}, productId={}, quantity={}",
                request.getCartId(), request.getProductId(), request.getQuantity());

        CompletableFuture<ProductResponse> productFuture =
                CompletableFuture.supplyAsync(() -> {
                    log.info("Fetching product in thread: {}", Thread.currentThread().getName());
                    return productClient.getProductById(request.getProductId());
                }, cartTaskExecutor);

        CompletableFuture<StockCheckResponse> stockFuture =
                CompletableFuture.supplyAsync(() -> {
                    log.info("Checking stock in thread: {}", Thread.currentThread().getName());
                    return productClient.checkStock(request.getProductId(), request.getQuantity());
                }, cartTaskExecutor);

        CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(productFuture, stockFuture);
        combinedFuture.join();

        ProductResponse product = productFuture.join();
        StockCheckResponse stockResponse = stockFuture.join();

        if (product == null) {
            throw new ResourceNotFoundException("Product not found with id: " + request.getProductId());
        }

        if (stockResponse == null || Boolean.FALSE.equals(stockResponse.getAvailable())) {
            throw new InsufficientStockException("Insufficient stock for product id: " + request.getProductId());
        }

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + request.getCartId()));

        CartItem cartItem = new CartItem();
        cartItem.setCartId(cart.getId());
        cartItem.setProductId(request.getProductId().longValue());
        cartItem.setQuantity(request.getQuantity());

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        log.info("Cart item saved successfully: id={}, cartId={}, productId={}, quantity={}",
                savedCartItem.getId(),
                savedCartItem.getCartId(),
                savedCartItem.getProductId(),
                savedCartItem.getQuantity());

        CartEvent cartEvent = new CartEvent(
                request.getCartId(),
                request.getProductId().longValue(),
                request.getQuantity()
        );

        kafkaProducerService.sendCartEvent(cartEvent);

        log.info("Product fetched successfully: {}", product.getName());
        log.info("Stock validation result: {}", stockResponse.getAvailable());
        log.info("Add to cart completed successfully for cartId={} and productId={}",
                request.getCartId(), request.getProductId());

        return savedCartItem;
    }
}