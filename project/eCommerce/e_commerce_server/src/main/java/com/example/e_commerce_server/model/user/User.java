package com.example.e_commerce_server.model.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String phone;

    @Indexed
    private String role; // Consumer, Seller, Admin

    private List<Address> addresses;

    private SellerInfo sellerInfo; // Only for Sellers

    private List<String> permissions; // Only for Admins

    @Indexed
    private String createdAt;
    private String updatedAt;

    private Credentials credentials;
}
