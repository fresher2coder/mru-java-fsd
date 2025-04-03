package com.example.chat_box_server.websocket_config;

import com.example.chat_box_server.model.ChatMessage;
import com.example.chat_box_server.security.JwtUtil;
import com.example.chat_box_server.service.OnlineUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtUtil jwtUtil;
    private final OnlineUserService onlineUserService;

    public ChatHandler(JwtUtil jwtUtil, OnlineUserService onlineUserService) {
        this.jwtUtil = jwtUtil;
        this.onlineUserService = onlineUserService;

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String token = getTokenFromSession(session);
        if (token == null || !jwtUtil.validateToken(token) || !jwtUtil.extractUsername(token).isPresent()) {
            session.close(CloseStatus.NOT_ACCEPTABLE);
            return;
        }

        String username = jwtUtil.extractUsername(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        userSessions.put(username, session);
        onlineUserService.addOnlineUser(username); // ✅ Add user to Redis
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        userSessions.values().remove(session);

        // ✅ Remove user from Redis when disconnected
        String username = userSessions.entrySet().stream()
                .filter(entry -> entry.getValue().equals(session))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        if (username != null) {
            onlineUserService.removeOnlineUser(username);
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

    private String getTokenFromSession(WebSocketSession session) {
        String query = session.getUri().getQuery(); // Get query params from WebSocket URL
        if (query == null || !query.startsWith("token=")) {
            return null;
        }
        return query.split("=")[1]; // Extract token from URL query (ws://localhost:8080/chat?token=xyz)
    }
}
