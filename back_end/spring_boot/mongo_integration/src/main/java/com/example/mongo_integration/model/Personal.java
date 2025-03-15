package com.example.mongo_integration.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Personal {
    private String name;
    private String email;
    private String phone;
    private String dob;
    private String gender;

    // Getters and Setters
}
