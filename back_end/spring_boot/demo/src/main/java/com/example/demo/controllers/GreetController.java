package com.example.demo.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greet")
public class GreetController {

    // http://localhost:8080/greet
    @PostMapping
    public String greet() {
        return "Welcome to the Spring World!";
    }
}
