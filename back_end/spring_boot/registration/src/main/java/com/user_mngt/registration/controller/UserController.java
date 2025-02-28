package com.user_mngt.registration.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user_mngt.registration.service.UserRegistration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRegistration userReg;

    @GetMapping
    public String getUsers() {
        return "Hi User! Welcome to User Management System";
    }

    @PostMapping("/register/{uname}/{notificationType}")
    public String userRegistration(@PathVariable String uname, @PathVariable String notificationType) {

        return userReg.registerUser(uname, notificationType);
    }

}
