package cart_service.cart_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cart_service.cart_service.entity.CartItem;

public interface  CartItemRepository extends JpaRepository<CartItem, Long> {
}