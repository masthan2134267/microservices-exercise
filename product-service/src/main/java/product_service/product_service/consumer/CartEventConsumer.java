package product_service.product_service.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import product_service.product_service.dto.CartEvent;

@Component
@Slf4j
public class CartEventConsumer {

    @KafkaListener(
            topics = "cart-topic",
            groupId = "product-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(CartEvent event) {
        log.info("Received cart event: {}", event);
    }
}