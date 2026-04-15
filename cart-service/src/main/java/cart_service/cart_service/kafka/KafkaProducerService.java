package cart_service.cart_service.kafka;

import cart_service.cart_service.event.CartEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, CartEvent> kafkaTemplate;

    @Value("${app.kafka.topic.cart}")
    private String cartTopic;

    public void sendCartEvent(CartEvent cartEvent) {
        kafkaTemplate.send(cartTopic, cartEvent);
        System.out.println("Kafka event sent: " + cartEvent);
    }
}