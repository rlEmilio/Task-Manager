package com.emilio.taskmanager.repository;

import com.emilio.taskmanager.entity.Task;
import com.emilio.taskmanager.entity.User;
import com.emilio.taskmanager.entity.enums.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedUser(User user);

    List<Task> findByStatus(TaskStatus status);

  List<Task> findByAssignedUserIdAndStatus(Long assignedUserId, TaskStatus status);

    List<Task> findByAssignedUserIdOrderByIdAsc(Long assignedUserId);

    Optional<Task> findByIdAndAssignedUserId(Long taskId, Long assignedUserId);

}