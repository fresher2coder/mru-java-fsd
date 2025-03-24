package com.example.mongo_integration.model;

import lombok.Data;

@Data
public class Credentials {
    private String username;
    private String password; // Hashed password

}
