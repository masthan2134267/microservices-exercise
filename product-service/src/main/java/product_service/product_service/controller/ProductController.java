package product_service.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import product_service.product_service.entity.Product;
import product_service.product_service.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Product>> getProductsWithPagination(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy) {
        Page<Product> products = productService.getProductsWithPagination(page, size, sortBy);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByMinPrice(@RequestParam Double minPrice) {
        List<Product> products = productService.getProductsByMinPrice(minPrice);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/names")
    public ResponseEntity<List<String>> getProductNames() {
        List<String> productNames = productService.getProductNames();
        return ResponseEntity.ok(productNames);
    }

    @GetMapping("/price-above/{price}")
    public ResponseEntity<List<Product>> getProductsAbovePrice(@PathVariable Double price) {
        List<Product> products = productService.getProductsAbovePrice(price);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}