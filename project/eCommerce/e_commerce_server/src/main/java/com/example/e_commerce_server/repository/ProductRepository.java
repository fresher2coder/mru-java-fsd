package com.example.e_commerce_server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.e_commerce_server.model.product.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    void deleteBySellerId(String id);
}
