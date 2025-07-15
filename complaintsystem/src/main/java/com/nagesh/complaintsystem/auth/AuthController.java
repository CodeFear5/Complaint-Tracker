package com.nagesh.complaintsystem.auth;

import com.nagesh.complaintsystem.model.User;
import com.nagesh.complaintsystem.repository.UserRepository;
import com.nagesh.complaintsystem.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ REGISTER endpoint
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return "Email already registered.";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully.";
    }

    // ✅ LOGIN endpoint
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        // 🔒 Validate credentials using Spring Security
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // 🧑 Fetch full User object
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔐 Generate JWT with user's role
        String token = jwtService.generateToken(user);

        // 📦 Return token inside JSON response
        return new AuthResponse(token);
    }
}
