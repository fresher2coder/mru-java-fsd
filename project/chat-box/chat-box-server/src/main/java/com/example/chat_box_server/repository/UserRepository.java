package com.example.chat_box_server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.chat_box_server.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

}
