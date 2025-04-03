package com.example.chat_box_server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.chat_box_server.model.ChatMessage;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findBySenderAndReceiverOrReceiverAndSender(
            String sender, String receiver, String receiver2, String sender2);
}
