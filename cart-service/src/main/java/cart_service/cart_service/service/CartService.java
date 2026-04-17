package cart_service.cart_service.service;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.dto.ProductResponse;
import cart_service.cart_service.dto.StockCheckResponse;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.event.CartEvent;
import cart_service.cart_service.external.ProductClient;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductClient productClient;
    private final KafkaTemplate<String, CartEvent> kafkaTemplate;

    @Qualifier("cartTaskExecutor")
    private final Executor cartTaskExecutor;

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + id));
    }

    public Cart updateCart(Long id, Cart cart) {
        Cart existingCart = getCartById(id);
        existingCart.setUserId(cart.getUserId());
        return cartRepository.save(existingCart);
    }

    public void deleteCart(Long id) {
        Cart existingCart = getCartById(id);
        cartRepository.delete(existingCart);
    }

    public CartItem addProductToCart(AddToCartRequest request) {

        CompletableFuture<ProductResponse> productFuture =
                CompletableFuture.supplyAsync(() -> {
                    System.out.println("Fetching product in thread: " + Thread.currentThread().getName());
                    return productClient.getProductById(request.getProductId());
                }, cartTaskExecutor);

        CompletableFuture<StockCheckResponse> stockFuture =
                CompletableFuture.supplyAsync(() -> {
                    System.out.println("Checking stock in thread: " + Thread.currentThread().getName());
                    return productClient.checkStock(request.getProductId(), request.getQuantity());
                }, cartTaskExecutor);

        CompletableFuture<Void> combinedFuture =
                CompletableFuture.allOf(productFuture, stockFuture);

        combinedFuture.join();

        ProductResponse product = productFuture.join();
        StockCheckResponse stockResponse = stockFuture.join();

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (stockResponse == null || Boolean.FALSE.equals(stockResponse.getAvailable())) {
            throw new RuntimeException("Insufficient stock for product id: " + request.getProductId());
        }

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + request.getCartId()));

        CartItem cartItem = new CartItem();
        cartItem.setCartId(cart.getId());
        cartItem.setProductId(request.getProductId().longValue());
        cartItem.setQuantity(request.getQuantity());

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        CartEvent cartEvent = new CartEvent(
                request.getCartId(),
                request.getProductId().longValue(),
                request.getQuantity()
        );

        kafkaTemplate.send("cart-topic", cartEvent);

        System.out.println("Product fetched successfully: " + product.getName());
        System.out.println("Stock validation result: " + stockResponse.getAvailable());
        System.out.println("Kafka event published successfully");

        return savedCartItem;
    }
}