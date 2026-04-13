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

    public Optional<CartItem> getCartItemById(Integer id) {
        return cartItemRepository.findById(id);
    }

    public CartItem updateCartItem(Integer id, CartItem updatedCartItem) {
        Optional<CartItem> existingCartItemOptional = cartItemRepository.findById(id);

        if (existingCartItemOptional.isPresent()) {
            CartItem existingCartItem = existingCartItemOptional.get();
            existingCartItem.setCartId(updatedCartItem.getCartId());
            existingCartItem.setProductId(updatedCartItem.getProductId());
            existingCartItem.setQuantity(updatedCartItem.getQuantity());
            return cartItemRepository.save(existingCartItem);
        }

        return null;
    }

    public boolean deleteCartItem(Integer id) {
        Optional<CartItem> existingCartItem = cartItemRepository.findById(id);

        if (existingCartItem.isPresent()) {
            cartItemRepository.deleteById(id);
            return true;
        }

        return false;
    }
}