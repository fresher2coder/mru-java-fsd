package com.example.chat_box_server.controller;

import org.springframework.web.bind.annotation.*;

import com.example.chat_box_server.model.ChatMessage;
import com.example.chat_box_server.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/messages")
    public List<ChatMessage> getAllMessages() {
        return chatService.getAllMessages();
    }

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.saveMessage(message);
    }
}
