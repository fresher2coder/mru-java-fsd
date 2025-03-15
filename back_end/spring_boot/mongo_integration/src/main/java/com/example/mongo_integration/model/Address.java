package com.example.mongo_integration.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Address {
    private String doorno;
    private String street;
    private String city;
    private String state;
    private String country;
    private String pin;

    // Getters and Setters
}
