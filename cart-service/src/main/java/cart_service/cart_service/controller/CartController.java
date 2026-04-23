package cart_service.cart_service.controller;

import cart_service.cart_service.dto.AddToCartRequest;
import cart_service.cart_service.entity.CartItem;
import cart_service.cart_service.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public CartItem addToCart(@Valid @RequestBody AddToCartRequest request) {
        return cartService.addToCart(request);
    }
}