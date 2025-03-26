package com.example.e_commerce_server.model.rating;

import lombok.*;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {

    @Id
    private String id;

    private String productId; // Reference to Product (not using @DBRef)
    private String userId; // Who gave the rating
    private double rating; // Example: 4.5
    private String review; // Optional review text
    private Instant createdAt;
}
