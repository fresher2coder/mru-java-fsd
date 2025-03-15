package com.example.mongo_integration.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Credentials {
    private String username;
    private String password;

    // Getters and Setters
}
