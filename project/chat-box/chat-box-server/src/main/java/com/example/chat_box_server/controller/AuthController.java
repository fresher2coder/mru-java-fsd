package com.example.chat_box_server.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.chat_box_server.dto.Credentials;
import com.example.chat_box_server.model.User;
import com.example.chat_box_server.service.AuthService;
import com.example.chat_box_server.service.OnlineUserService;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final OnlineUserService onlineUserService;

    public AuthController(AuthService authService, OnlineUserService onlineUserService) {
        this.authService = authService;
        this.onlineUserService = onlineUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = authService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Credentials credentials,
            HttpServletResponse response) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        String token = authService.loginUser(username, password);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // Set false for local testing
                .path("/")
                .maxAge(60 * 60)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return ResponseEntity.ok(Map.of("message", "Login successful", "username", username));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response,
            @CookieValue(value = "jwt", required = false) String token) {
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        authService.logoutUser(token);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @GetMapping("/check-auth")
    public ResponseEntity<Map<String, User>> authenticateUser(
            @CookieValue(value = "jwt", required = false) String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(Map.of("user", user));
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }

    @GetMapping("/online-users")
    public ResponseEntity<Set<String>> getOnlineUsers(@CookieValue(value = "jwt", required = false) String token) {
        Set<String> onlineUsers = onlineUserService.getOnlineUsers(); // Fetch from Redis
        return ResponseEntity.ok(onlineUsers); // ✅ Don't remove current user
    }

}
