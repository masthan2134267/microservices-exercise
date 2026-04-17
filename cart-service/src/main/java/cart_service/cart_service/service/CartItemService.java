package cart_service.cart_service.service;

import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem updateCartItem(Long id, CartItem updatedCartItem) {
        return cartItemRepository.findById(id).map(existingCartItem -> {
            existingCartItem.setCartId(updatedCartItem.getCartId());
            existingCartItem.setProductId(updatedCartItem.getProductId());
            existingCartItem.setQuantity(updatedCartItem.getQuantity());
            return cartItemRepository.save(existingCartItem);
        }).orElse(null);
    }

    public boolean deleteCartItem(Long id) {
        if (!cartItemRepository.existsById(id)) {
            return false;
        }
        cartItemRepository.deleteById(id);
        return true;
    }
}