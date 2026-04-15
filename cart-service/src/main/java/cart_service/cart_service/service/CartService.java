package cart_service.cart_service.service;

import cart_service.cart_service.dto.ProductDto;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.exception.InsufficientStockException;
import cart_service.cart_service.exception.ResourceNotFoundException;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final WebClient productWebClient;

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart getCartById(Integer cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));
    }

    public CartItem addToCart(Integer cartId, Integer productId, Integer quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

        ProductDto product = fetchProduct(productId);

        if (product.getStock() == null || product.getStock() < quantity) {
            throw new InsufficientStockException(
                    "Not enough stock available for product id: " + productId
            );
        }

        CartItem item = new CartItem();
        item.setCartId(cart.getId());
        item.setProductId(productId);
        item.setQuantity(quantity);

        return cartItemRepository.save(item);
    }

    private ProductDto fetchProduct(Integer productId) {
        ProductDto product = productWebClient.get()
                .uri("/products/{id}", productId)
                .retrieve()
                .bodyToMono(ProductDto.class)
                .block();

        if (product == null) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        return product;
    }
}