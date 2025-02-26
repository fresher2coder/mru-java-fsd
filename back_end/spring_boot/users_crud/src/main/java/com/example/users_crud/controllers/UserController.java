package com.example.users_crud.controllers;

import com.example.users_crud.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/users")
public class UserController {

    private final Map<Long, User> userMap = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong(1); // Auto-increment ID

    // Create User (Prevent duplicate emails)
    @PostMapping
    public String createUser(@RequestBody User user) {
        if (emailExists(user.getEmail())) {
            return "Error: Email already exists!";
        }

        long id = counter.getAndIncrement();
        user.setId(id);
        userMap.put(id, user);
        return "User created successfully with ID: " + id;
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return new ArrayList<>(userMap.values());
    }

    // Get User by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userMap.getOrDefault(id, null);
    }

    // Update User (Prevent email duplication)
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        if (!userMap.containsKey(id)) {
            return "Error: User not found!";
        }

        // Check if another user (excluding the current one) has the same email
        for (Map.Entry<Long, User> entry : userMap.entrySet()) {
            if (!entry.getKey().equals(id) && entry.getValue().getEmail().equals(updatedUser.getEmail())) {
                return "Error: Email already exists!";
            }
        }

        updatedUser.setId(id);
        userMap.put(id, updatedUser);
        return "User updated successfully!";
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (userMap.remove(id) != null) {
            return "User with ID " + id + " deleted successfully!";
        }
        return "User not found!";
    }

    // Helper method to check if email already exists
    private boolean emailExists(String email) {
        return userMap.values().stream().anyMatch(user -> user.getEmail().equals(email));
    }
}
