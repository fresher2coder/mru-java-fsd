package com.example.e_commerce_server.model.product;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private String id;

    private String name;
    private String description;
    private String category;
    private BigDecimal price;

    private Discount discount;

    private String brand;

    @Indexed
    private String sellerId; // Storing ObjectId as String, avoiding @DBRef

    private Inventory inventory;

    private List<String> imageFilenames;

    private Instant createdAt;
    private Instant updatedAt;

    private Map<String, String> specifications; // Example: "RAM" -> "12GB", "Battery" -> "5000mAh"

    @Indexed(expireAfterSeconds = 0) // TTL index
    private Instant expiresAt; // MongoDB auto-deletes when this time is reached
}
