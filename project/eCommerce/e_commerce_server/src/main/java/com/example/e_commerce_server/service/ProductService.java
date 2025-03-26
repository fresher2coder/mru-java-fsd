package com.example.e_commerce_server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.e_commerce_server.model.product.Product;
import com.example.e_commerce_server.repository.ProductRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    // Directory inside static folder
    private final String UPLOAD_DIR = "uploads/";
    private final String STATIC_PATH = "src/main/resources/static/" + UPLOAD_DIR;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product, MultipartFile[] files) throws IOException {
        // Create uploads directory if it doesn't exist
        Path uploadDirPath = Paths.get(STATIC_PATH);
        if (!Files.exists(uploadDirPath)) {
            Files.createDirectories(uploadDirPath);
        }

        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : files) {
            // Generate unique file name
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(STATIC_PATH, fileName);

            // Copy file to the directory
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Store only the filename in DB
            fileNames.add(fileName);
        }

        // Set images in product
        product.setImageFilenames(fileNames);
        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());

        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product by ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // Update Product
    public Product updateProduct(String id, Product updatedProduct) {
        productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        updatedProduct.setId(id); // Ensure ID is retained
        return productRepository.save(updatedProduct);
    }

    // Delete Product
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
