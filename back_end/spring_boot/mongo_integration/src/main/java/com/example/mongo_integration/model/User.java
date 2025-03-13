package com.example.mongo_integration.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Data
@Component
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
}
