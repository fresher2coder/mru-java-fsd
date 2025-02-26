package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {
    
    // http://localhost:8080/hello
    @GetMapping
    public String sayHello(){
        return "Hello!, Spring Boot!";
    }
}
