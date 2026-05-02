package com.emilio.taskmanager.auth;



import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.emilio.taskmanager.config.Exception.DuplicateResourceException;
import com.emilio.taskmanager.config.Exception.ResourceNotFoundException;
import com.emilio.taskmanager.dtos.auth.AuthResponse;
import com.emilio.taskmanager.dtos.auth.LoginRequest;
import com.emilio.taskmanager.dtos.auth.RegisterRequest;
import com.emilio.taskmanager.entity.User;
import com.emilio.taskmanager.entity.enums.Role;
import com.emilio.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Ese email ya está registrado");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .message("Usuario registrado correctamente")
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }

    

    public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

    boolean isValid = passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
    );

    if (!isValid) {
        throw new BadCredentialsException("Contraseña incorrecta");
    }
    return AuthResponse.builder()
            .token(jwtService.generateToken(user))
            .message("Login OK")
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .build();
}
}
