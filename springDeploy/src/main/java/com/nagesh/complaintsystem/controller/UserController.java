package com.nagesh.complaintsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nagesh.complaintsystem.model.User;
import com.nagesh.complaintsystem.repository.UserRepository;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 👉 This will run on http://localhost:8080/
    @GetMapping("/")
    public String home() {
        return "Welcome to Complaint Tracker API (Spring Boot Running on Port 8080)";
    }

    // POST /api/users
    @PostMapping("/api/users")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // GET /api/users
    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
