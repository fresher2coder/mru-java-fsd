package com.example.chat_box_server.dto;

import lombok.Data;

@Data
public class Credentials {
    private String username;
    private String password; // Hashed password

}
