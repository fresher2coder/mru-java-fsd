package com.example.mongo_integration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.mongo_integration.exception.UserNotFoundException;
import com.example.mongo_integration.model.User;
import com.example.mongo_integration.repository.UserRepository;
import com.example.mongo_integration.security.JwtUtil;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
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
        // 1. Remove "Bearer " prefix
        String cleanedToken = token.replace("Bearer ", "");

        // 2. Validate token
        Optional<String> extractedUsername = jwtUtil.extractUsername(cleanedToken);
        if (extractedUsername.isEmpty()) {
            throw new UserNotFoundException("Invalid or expired token.");
        }

        // 3. Fetch user from database
        User user = userRepository.findByCredentialsUsername(extractedUsername.get())
                .orElseThrow(() -> new UserNotFoundException("User not found for token."));

        // 4. Revalidate token against extracted username (for extra security)
        if (!jwtUtil.validateToken(cleanedToken, user.getCredentials().getUsername())) {
            throw new UserNotFoundException("Invalid token for this user.");
        }

        return user;
    }

    // 2️⃣ Retrieve User by ID (Throws Not Found Exception)
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found."));
    }

    // 3️⃣ Retrieve All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 4️⃣ Update User (Throws Not Found Exception)
    public User updateUser(String id, User updatedUser) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with ID " + id + " not found.");
        }
        updatedUser.setId(id); // Ensure the same ID is used
        return userRepository.save(updatedUser);
    }

    // 5️⃣ Delete User (Throws Not Found Exception)
    public void deleteUserById(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with ID " + id + " not found.");
        }
        userRepository.deleteById(id);
    }

    // 6️⃣ Delete All Users
    /**
     * Deletes all users from the database.
     * ⚠️ Use this method with caution as it will remove all user records.
     */
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // 7️⃣ Get All Users with Pagination
    /**
     * Retrieves a paginated list of users.
     * 
     * @param page The page number (starting from 0).
     * @param size The number of users per page.
     * @return A paginated list of users.
     */
    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    // 8️⃣ Get All Users Sorted
    /**
     * Retrieves all users sorted by a specific field.
     * 
     * @param sortBy        The field name to sort by.
     * @param sortDirection The sorting direction ("asc" for ascending, "desc" for
     *                      descending).
     * @return A sorted list of users.
     */
    public List<User> getAllUsersSorted(String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return userRepository.findAll(sort);
    }

    // 9️⃣ Get Paginated & Sorted Users
    /**
     * Retrieves a paginated and sorted list of users.
     * 
     * @param page          The page number (starting from 0).
     * @param size          The number of users per page.
     * @param sortBy        The field name to sort by.
     * @param sortDirection The sorting direction ("asc" for ascending, "desc" for
     *                      descending).
     * @return A paginated and sorted list of users.
     */
    public Page<User> getUsersPaginatedAndSorted(int page, int size, String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findAll(pageable);
    }

}
