package com.example.e_commerce_server.model.user;

import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;

@Data
public class Credentials {

    @Indexed(unique = true)
    private String username;
    private String password;
}
