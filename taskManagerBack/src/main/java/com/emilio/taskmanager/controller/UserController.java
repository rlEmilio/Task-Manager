package com.emilio.taskmanager.controller;

import com.emilio.taskmanager.auth.UserPrincipal;
import com.emilio.taskmanager.dtos.UserResponse;
import com.emilio.taskmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskmanager")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // USER / AUTHENTICATED USER
    @GetMapping("/users/me")
    public UserResponse me(Authentication auth) {
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @GetMapping("/users/test")
    public String test() {
        return "Acceso permitido";
    }

    // ADMIN
    @GetMapping("/admin/users")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/admin/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/admin/users/search")
    public ResponseEntity<UserResponse> getUserByName(@RequestParam String name) {
        return ResponseEntity.ok(userService.getUserByName(name));
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}