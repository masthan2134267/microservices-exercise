package product_service.product_service.service;

import org.springframework.stereotype.Service;
import product_service.product_service.entity.Product;
import product_service.product_service.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.orElse(null);
    }

    public boolean validateStock(Integer productId, Integer quantity) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return product.getStock() >= quantity;
        }
        return false;
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}