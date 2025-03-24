package com.example.mongo_integration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mongo_integration.exception.UserNotFoundException;
import com.example.mongo_integration.model.User;
import com.example.mongo_integration.repository.UserRepository;
import com.example.mongo_integration.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 1️⃣ Create User (Relies on MongoDB Unique Index for Duplicate Handling) -
    // Registration
    public User saveUser(User user) {
        // Hash the password before saving
        user.getCredentials().setPassword(passwordEncoder.encode(user.getCredentials().getPassword()));

        return userRepository.save(user); // DuplicateKeyException will be thrown if a unique constraint is violated
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
        user.setPersonal(updatedUser.getPersonal());
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
