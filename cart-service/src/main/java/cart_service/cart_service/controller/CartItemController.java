package cart_service.cart_service.controller;

import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-items")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
        CartItem savedCartItem = cartItemService.saveCartItem(cartItem);
        return ResponseEntity.ok(savedCartItem);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        return ResponseEntity.ok(cartItemService.getAllCartItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Integer id) {
        return cartItemService.getCartItemById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Integer id,
                                                   @RequestBody CartItem updatedCartItem) {
        CartItem cartItem = cartItemService.updateCartItem(id, updatedCartItem);
        if (cartItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Integer id) {
        boolean deleted = cartItemService.deleteCartItem(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Cart item deleted successfully");
    }
}