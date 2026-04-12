package cart_service.cart_service.service;

import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem getCartItemById(Integer id) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(id);
        return optionalCartItem.orElse(null);
    }

    public void deleteCartItem(Integer id) {
        cartItemRepository.deleteById(id);
    }
}