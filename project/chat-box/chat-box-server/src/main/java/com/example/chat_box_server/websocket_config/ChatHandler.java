package com.example.chat_box_server.websocket_config;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

import com.example.chat_box_server.model.ChatMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserId(session);
        if (userId != null) {
            userSessions.put(userId, session);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);
        chatMessage.setTimestamp(LocalDateTime.now()); // Set timestamp

        WebSocketSession receiverSession = userSessions.get(chatMessage.getReceiver());
        if (receiverSession != null && receiverSession.isOpen()) {
            receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
        }

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        userSessions.values().remove(session);
    }

    private String getUserId(WebSocketSession session) {
        return session.getUri().getQuery().split("=")[1]; // Extract userId from WebSocket URL
    }
}
