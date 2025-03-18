package com.example.mongo_integration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.mongo_integration.model.User;
import com.example.mongo_integration.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 1️⃣ Create User
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // 🔹 Login & Get JWT
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String token = userService.loginUser(email, password);
        return ResponseEntity.ok(Map.of("token", token));
    }

    // 2️⃣ Retrieve User by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // 3️⃣ Retrieve All Users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 4️⃣ Update Existing User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    // 5️⃣ Delete User by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
    }

    // 6️⃣ Delete All Users
    @DeleteMapping
    public ResponseEntity<String> deleteAllUsers() {
        userService.deleteAllUsers();
        return ResponseEntity.ok("All users deleted successfully.");
    }

    // GET Users with Pagination
    @GetMapping("/paginated")
    public ResponseEntity<Page<User>> getUsersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(userService.getAllUsers(page, size));
    }

    // GET Users with Sorting
    @GetMapping("/sorted")
    public ResponseEntity<List<User>> getUsersWithSorting(
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        return ResponseEntity.ok(userService.getAllUsersSorted(sortBy, sortDirection));
    }

    // GET Users with Pagination & Sorting
    @GetMapping("/paginated-sorted")
    public ResponseEntity<Page<User>> getUsersWithPaginationAndSorting(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        return ResponseEntity.ok(userService.getUsersPaginatedAndSorted(page, size, sortBy, sortDirection));
    }
}
