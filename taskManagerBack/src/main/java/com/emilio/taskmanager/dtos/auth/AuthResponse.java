package com.emilio.taskmanager.dtos.auth;

import com.emilio.taskmanager.entity.enums.Role;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String message;
    private String email;
    private String name;
    private Role role;
}
