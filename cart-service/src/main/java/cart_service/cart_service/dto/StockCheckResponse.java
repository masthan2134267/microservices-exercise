package cart_service.cart_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockCheckResponse {
    private Integer productId;
    private Integer requestedQuantity;
    private Boolean available;
}