package com.example.chat_box_server.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class OnlineUserService {
    private static final String ONLINE_USERS_KEY = "online_users";
    private final RedisTemplate<String, String> redisTemplate;

    public OnlineUserService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // ✅ Add user to online list (Prevent null values)
    public void addOnlineUser(String username) {
        if (username != null && !username.trim().isEmpty()) {
            redisTemplate.opsForSet().add(ONLINE_USERS_KEY, username);
        }
    }

    // ✅ Remove user from online list
    public void removeOnlineUser(String username) {
        if (username != null && !username.trim().isEmpty()) {
            redisTemplate.opsForSet().remove(ONLINE_USERS_KEY, username);
        }
    }

    // ✅ Get all online users
    public Set<String> getOnlineUsers() {
        return redisTemplate.opsForSet().members(ONLINE_USERS_KEY);
    }
}
