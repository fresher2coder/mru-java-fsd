package com.example.e_commerce_server.model.user;

import lombok.Data;

@Data
public class Address {
    private String type; // Home, Business, etc.
    private String street;
    private String city;
    private String state;
    private String zip;
    private String country;

}
