package com.example.chat_box_server.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime timestamp; // New field for timestamps

    public ChatMessage() {
        this.timestamp = LocalDateTime.now(); // Automatically set timestamp
    }

    public ChatMessage(String sender, String receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
}
