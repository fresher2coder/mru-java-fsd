package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/users")
public class UserController {

    //http://localhost:8080/users/1
    @GetMapping("/{id}")
    public String getUser(@PathVariable int id) {
        return "User: " + id;
    }

    //http://localhost:8080/users?name=dk&email=dk@gmail.com&pass=123
    @PostMapping
    public String postUser(@RequestParam String name, String email, String pass){
        return name + " " + email + " " + pass;
    }

    // http://localhost:8080/users/search?name=dineshkumar
    @PostMapping("/search")
    public Map<String, String> getUser(@RequestParam String name){

        Map<String, String> user = new HashMap<>();
        user.put("name", name);
        user.put("msg", "Hello!, " + name);
        
        return user;
    }
}

