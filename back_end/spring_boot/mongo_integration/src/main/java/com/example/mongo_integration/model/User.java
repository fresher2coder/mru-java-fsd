package com.example.mongo_integration.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component
@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB automatically generates ObjectId
    private Personal personal;
    private Address permanent;
    private Address current;
    private boolean sameAsPermanent;
    private List<Language> languages;
    private Credentials credentials;

    // Getters and Setters
}
