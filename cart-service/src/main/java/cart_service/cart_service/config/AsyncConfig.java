package cart_service.cart_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class AsyncConfig {

    @Bean(name = "cartTaskExecutor")
    public Executor cartTaskExecutor() {
        return Executors.newFixedThreadPool(5);
    }
}