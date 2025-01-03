package com.grooveplayer.service;

import com.grooveplayer.model.User;
import java.util.HashMap;
import java.util.Map;

public class UserService {
    private Map<String, User> users = new HashMap<>();

    public User registerUser(String name, String email, String password) {
        if (users.containsKey(email)) {
            throw new RuntimeException("User already exists");
        }
        User user = new User(name, email, password);
        users.put(email, user);
        return user;
    }

    public User loginUser(String email, String password) {
        User user = users.get(email);
        if (user == null || !user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }
}