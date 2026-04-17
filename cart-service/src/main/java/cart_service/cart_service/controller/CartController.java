package cart_service.cart_service.controller;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody AddToCartRequest request) {
        Long cartId = 1L; // using existing cart id
        cartService.addToCart(cartId, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok("Product added to cart successfully");
    }
}