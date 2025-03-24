package com.example.mongo_integration.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Language {
    private String name;
    private boolean read;
    private boolean write;
    private boolean speak;

    // Getters and Setters
}
