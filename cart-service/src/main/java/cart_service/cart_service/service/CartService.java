package cart_service.cart_service.service;

import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.repository.CartItemRepository;
import cart_service.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public void addToCart(Long userId, Long productId, int quantity) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        Cart savedCart = cartRepository.save(cart);

        CartItem cartItem = new CartItem();
        cartItem.setCartId(savedCart.getId());
        cartItem.setProductId(productId);
        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);
    }
}