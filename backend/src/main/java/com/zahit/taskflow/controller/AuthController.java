package com.zahit.taskflow.controller;


import com.zahit.taskflow.model.User;
import com.zahit.taskflow.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.zahit.taskflow.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getEmail());
    }
}