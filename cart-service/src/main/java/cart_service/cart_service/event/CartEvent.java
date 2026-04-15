package cart_service.cart_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartEvent {
    private Integer cartId;
    private Integer productId;
    private Integer quantity;
}