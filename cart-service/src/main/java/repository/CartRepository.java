package cart_service.cart_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cart_service.cart_service.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
}