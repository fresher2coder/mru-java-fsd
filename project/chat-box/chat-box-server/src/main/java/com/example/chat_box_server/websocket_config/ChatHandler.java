package com.example.chat_box_server.websocket_config;

import com.example.chat_box_server.model.ChatMessage;
import com.example.chat_box_server.security.JwtUtil;
import com.example.chat_box_server.service.OnlineUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

        if (token == null || token.isEmpty()) {
            System.out.println("Invalid token: Token is missing!");
            session.close(CloseStatus.NOT_ACCEPTABLE);
            return;
        }

        if (!jwtUtil.validateToken(token) || !jwtUtil.extractUsername(token).isPresent()) {
            System.out.println("Invalid token: JWT validation failed!");
            session.close(CloseStatus.NOT_ACCEPTABLE);
            return;
        }

        String username = jwtUtil.extractUsername(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        System.out.println("✅ Authenticated WebSocket connection for user: " + username);

        // ✅ Store session using username as key
        userSessions.put(username, session);
        session.getAttributes().put("username", username);

        onlineUserService.addOnlineUser(username);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String username = (String) session.getAttributes().get("username");

        if (username != null) {
            userSessions.remove(username); // ✅ Remove using username
            onlineUserService.removeOnlineUser(username);
            System.out.println("❌ Disconnected: " + username);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);
        chatMessage.setTimestamp(LocalDateTime.now());

        String receiver = chatMessage.getReceiver();
        WebSocketSession receiverSession = userSessions.get(receiver);

        if (receiverSession != null && receiverSession.isOpen()) {
            receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            System.out.println("📤 Sent message to: " + receiver);
        } else {
            System.out.println("📭 Receiver is offline: " + receiver);
        }
    }

    private String getTokenFromSession(WebSocketSession session) {
        String query = session.getUri().getQuery(); // Get query params from WebSocket URL
        System.out.println("WebSocket Query: " + query); // 🔍 Debugging

        if (query == null || !query.contains("token=")) {
            System.out.println("Token not found in query!");
            return null;
        }

        String[] parts = query.split("token=");
        if (parts.length < 2 || parts[1].isEmpty()) {
            System.out.println("Extracted token is empty!");
            return null;
        }

        String token = parts[1].trim();
        System.out.println("Extracted Token: " + token);
        return token;
    }
}
