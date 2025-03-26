package com.example.e_commerce_server.service;

import org.springframework.stereotype.Service;

import com.example.e_commerce_server.exception.UserNotFoundException;
import com.example.e_commerce_server.model.user.User;
import com.example.e_commerce_server.repository.ProductRepository;
import com.example.e_commerce_server.repository.UserRepository;
import com.example.e_commerce_server.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Instant;

import java.util.Arrays;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, ProductRepository productRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.jwtUtil = jwtUtil;
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 1️⃣ Create User (Relies on MongoDB Unique Index for Duplicate Handling) -
    // Registration
    public User saveUser(User user) {
        // Hash the password before saving
        user.getCredentials().setPassword(passwordEncoder.encode(user.getCredentials().getPassword()));

        String now = Instant.now().toString();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        // Role-based validations
        switch (user.getRole().toLowerCase()) {
            case "seller":
                if (user.getSellerInfo() == null) {
                    throw new IllegalArgumentException("Seller information is required for seller registration.");
                }
                break;
            case "admin":
                user.setPermissions(Arrays.asList("manage_users", "manage_orders", "manage_products", "view_reports"));
                break;
            case "consumer":
                // No extra setup needed since wishlist, cart, and orders are now separate
                // collections
                break;
            default:
                throw new IllegalArgumentException("Invalid role: " + user.getRole());
        }

        return userRepository.save(user);
    }

    // 🔹 Login & Generate JWT
    public String loginUser(String username, String password) {
        User user = userRepository.findByCredentialsUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getCredentials().getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getCredentials().getUsername());
        // return "jolly";
    }

    public User getUserFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new UserNotFoundException("No authentication token found.");
        }

        // 1. Validate the token
        Optional<String> extractedUsername = jwtUtil.extractUsername(token);
        if (extractedUsername.isEmpty()) {
            throw new UserNotFoundException("Invalid or expired token.");
        }

        // 2. Fetch user from the database
        User user = userRepository.findByCredentialsUsername(extractedUsername.get())
                .orElseThrow(() -> new UserNotFoundException("User not found for token."));

        // 3. Revalidate token against extracted username (extra security)
        if (!jwtUtil.validateToken(token, user.getCredentials().getUsername())) {
            throw new UserNotFoundException("Invalid token for this user.");
        }

        return user;
    }

    public User updateUser(String id, User updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUpdatedAt(Instant.now().toString());
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // If the user is a seller, delete all their products
        if ("seller".equalsIgnoreCase(user.getRole())) {
            productRepository.deleteBySellerId(id);
        }

        // Now delete the user
        userRepository.deleteById(id);
    }
}
