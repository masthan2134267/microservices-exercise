package cart_service.cart_service.controller;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.entity.Cart;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.createCart(cart));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Integer id) {
        return ResponseEntity.ok(cartService.getCartById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(
                cartService.addToCart(
                        request.getCartId(),
                        request.getProductId(),
                        request.getQuantity()
                )
        );
    }
}