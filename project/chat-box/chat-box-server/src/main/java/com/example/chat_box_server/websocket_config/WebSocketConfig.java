package com.example.chat_box_server.websocket_config;

import com.example.chat_box_server.security.JwtUtil;
import com.example.chat_box_server.service.OnlineUserService;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final JwtUtil jwtUtil;
    private final OnlineUserService onlineUserService;

    public WebSocketConfig(JwtUtil jwtUtil, OnlineUserService onlineUserService) {
        this.jwtUtil = jwtUtil;
        this.onlineUserService = onlineUserService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatHandler(jwtUtil, onlineUserService), "/chat").setAllowedOrigins("*");
    }

}
