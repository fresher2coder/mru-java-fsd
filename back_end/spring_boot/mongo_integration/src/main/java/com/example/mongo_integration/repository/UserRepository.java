package com.example.mongo_integration.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.mongo_integration.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
