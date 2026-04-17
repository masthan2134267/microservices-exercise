package cart_service.cart_service.external;

import cart_service.cart_service.dto.ProductResponse;
import cart_service.cart_service.dto.StockCheckResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ProductClient {

    private final WebClient.Builder webClientBuilder;

    public ProductResponse getProductById(Integer productId) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:8081/products/{id}", productId)
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .block();
    }

    public StockCheckResponse checkStock(Integer productId, Integer quantity) {
        return webClientBuilder.build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8081)
                        .path("/products/{id}/stock/check")
                        .queryParam("quantity", quantity)
                        .build(productId))
                .retrieve()
                .bodyToMono(StockCheckResponse.class)
                .block();
    }
}