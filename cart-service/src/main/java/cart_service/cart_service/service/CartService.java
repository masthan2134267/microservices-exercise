package cart_service.cart_service.service;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.event.CartEvent;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final KafkaTemplate<String, CartEvent> kafkaTemplate;

    public CartItem addToCart(AddToCartRequest request) {

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseGet(() -> cartRepository.save(
                        new Cart(null, request.getCartId())
                ));

        CartItem cartItem = new CartItem();
        cartItem.setCartId(cart.getId());
        cartItem.setProductId(request.getProductId());
        cartItem.setQuantity(request.getQuantity());

        CartItem savedItem = cartItemRepository.save(cartItem);

        CartEvent event = new CartEvent(
                cart.getId(),
                request.getProductId(),
                request.getQuantity()
        );

        kafkaTemplate.send("cart-topic", event);

        return savedItem;
    }
}