package com.emilio.taskmanager.repository;

import com.emilio.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);

    boolean existsByName(String name);

    //buscamos usuario por email, para validar login
     Optional<User> findByEmail(String email);
     boolean existsByEmail(String email);
}