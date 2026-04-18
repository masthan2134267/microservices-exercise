package cart_service.cart_service.kafka;

import cart_service.cart_service.event.CartEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, CartEvent> kafkaTemplate;

    @Value("${app.kafka.topic.cart}")
    private String cartTopic;

    public void sendCartEvent(CartEvent cartEvent) {
        kafkaTemplate.send(cartTopic, cartEvent);
        log.info("Kafka event sent successfully to topic {}: {}", cartTopic, cartEvent);
    }
}