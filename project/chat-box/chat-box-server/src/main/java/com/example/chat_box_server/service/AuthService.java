package com.example.chat_box_server.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chat_box_server.exception.UserNotFoundException;
import com.example.chat_box_server.model.User;
import com.example.chat_box_server.repository.UserRepository;
import com.example.chat_box_server.security.JwtUtil;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    private MongoTemplate mongoTemplate;
    private OnlineUserService onlineUserService;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, MongoTemplate mongoTemplate,
            OnlineUserService onlineUserService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.mongoTemplate = mongoTemplate;
        this.onlineUserService = onlineUserService;
    }

    // 1️⃣ Create User (Relies on MongoDB Unique Index for Duplicate Handling) -
    // Registration
    public User saveUser(User user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user); // DuplicateKeyException will be thrown if a unique constraint is violated
    }

    // 🔹 Login & Generate JWT
    public String loginUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }

        Query query = new Query(Criteria.where("username").is(username));
        Update update = new Update().set("online", true);
        mongoTemplate.updateFirst(query, update, User.class);

        onlineUserService.addOnlineUser(username); // Mark user as online

        return jwtUtil.generateToken(user.getUsername());
        // return "jolly";
    }

    public String logoutUser(String token) {
        String extractedUsername = jwtUtil.extractUsername(token)
                .orElseThrow(() -> new UserNotFoundException("Invalid token for this user."));

        Query query = new Query(Criteria.where("username").is(extractedUsername));
        Update update = new Update().set("online", false);
        mongoTemplate.updateFirst(query, update, User.class);

        onlineUserService.removeOnlineUser(extractedUsername); // Mark user as offline
        return "Logout successful";
    }

    public User getUserFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new UserNotFoundException("No authentication token found.");
        }

        // 1. Validate the token
        if (!jwtUtil.validateToken(token)) {
            throw new UserNotFoundException("Invalid token for this user.");
        }
        // 2. Revalidate token against extracted username (extra security)
        Optional<String> extractedUsername = jwtUtil.extractUsername(token);
        if (extractedUsername.isEmpty()) {
            throw new UserNotFoundException("Invalid or expired token.");
        }

        // 23 Fetch user from the database
        User user = userRepository.findByUsername(extractedUsername.get())
                .orElseThrow(() -> new UserNotFoundException("User not found for token."));

        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
