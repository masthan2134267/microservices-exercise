package cart_service.cart_service.service;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.dto.ProductResponse;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.event.CartEvent;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final KafkaTemplate<String, CartEvent> kafkaTemplate;
    private final WebClient.Builder webClientBuilder;

    public CartItem addToCart(AddToCartRequest request) {

        ProductResponse product = webClientBuilder.build()
                .get()
                .uri("http://localhost:8081/products/" + request.getProductId())
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .block();

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (product.getStock() == null || product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseGet(() -> cartRepository.save(new Cart(null, request.getCartId())));

        CartItem cartItem = new CartItem();
        cartItem.setCartId(cart.getId());
        cartItem.setProductId(request.getProductId());
        cartItem.setQuantity(request.getQuantity());

        CartItem savedItem = cartItemRepository.save(cartItem);

        try {
            CartEvent event = new CartEvent(
                    savedItem.getCartId(),
                    savedItem.getProductId(),
                    savedItem.getQuantity()
            );

            kafkaTemplate.send("cart-topic", event);
        } catch (Exception e) {
            System.out.println("Kafka send failed: " + e.getMessage());
        }

        return savedItem;
    }
}