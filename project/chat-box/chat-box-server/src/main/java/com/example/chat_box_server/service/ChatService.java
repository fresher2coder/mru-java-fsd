package com.example.chat_box_server.service;

import org.springframework.stereotype.Service;

import com.example.chat_box_server.model.ChatMessage;
import com.example.chat_box_server.repository.ChatMessageRepository;

import java.util.List;

@Service
public class ChatService {
    private final ChatMessageRepository repository;

    public ChatService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public List<ChatMessage> getAllMessages() {
        return repository.findAll();
    }

    public List<ChatMessage> getMessagesBetweenUsers(String sender, String receiver) {
        return repository.findBySenderAndReceiverOrReceiverAndSender(sender, receiver, sender, receiver);
    }

    public ChatMessage saveMessage(ChatMessage message) {
        return repository.save(message);
    }
}
