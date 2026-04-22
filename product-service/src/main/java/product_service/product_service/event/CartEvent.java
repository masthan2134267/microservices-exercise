package product_service.product_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartEvent {

    private Long cartId;
    private Long productId;
    private int quantity;

}