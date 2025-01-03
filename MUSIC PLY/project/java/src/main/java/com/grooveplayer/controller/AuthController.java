package com.grooveplayer.controller;

import com.grooveplayer.model.User;
import com.grooveplayer.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(
            request.getName(),
            request.getEmail(),
            request.getPassword()
        );
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.loginUser(request.getEmail(), request.getPassword());
    }
}