package com.emilio.taskmanager.service;

import com.emilio.taskmanager.config.Exception.ResourceNotFoundException;
import com.emilio.taskmanager.dtos.UserResponse;
import com.emilio.taskmanager.entity.User;
import com.emilio.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado con id: " + id)
                );

        return mapToResponse(user);
    }

    public UserResponse getUserByName(String name) {
        User user = userRepository.findByName(name)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado con nombre: " + name)
                );

        return mapToResponse(user);
    }

    public boolean existsByName(String name) {
        return userRepository.existsByName(name);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con id: " + id);
        }

        userRepository.deleteById(id);
    }
}