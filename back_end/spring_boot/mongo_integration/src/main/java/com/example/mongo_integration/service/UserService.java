package com.example.mongo_integration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.mongo_integration.exception.DuplicateUserException;
import com.example.mongo_integration.exception.UserNotFoundException;
import com.example.mongo_integration.model.User;
import com.example.mongo_integration.repository.UserRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 1️⃣ Create User (Throws Duplicate Exception)
    public User saveUser(User user) {
        if (userRepository.existsById(user.getId())) {
            throw new DuplicateUserException("User with ID " + user.getId() + " already exists.");
        }
        return userRepository.save(user);
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
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Get all users with pagination
    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    // Get all users sorted
    public List<User> getAllUsersSorted(String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return userRepository.findAll(sort);
    }

    // Get paginated & sorted users
    public Page<User> getUsersPaginatedAndSorted(int page, int size, String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findAll(pageable);
    }
}
