package com.emilio.taskmanager.service;

import com.emilio.taskmanager.config.Exception.ResourceNotFoundException;
import com.emilio.taskmanager.dtos.TaskRequest;
import com.emilio.taskmanager.dtos.TaskResponse;
import com.emilio.taskmanager.dtos.TaskStatusUpdateRequest;
import com.emilio.taskmanager.dtos.UserResponse;
import com.emilio.taskmanager.entity.Task;
import com.emilio.taskmanager.entity.User;
import com.emilio.taskmanager.entity.enums.TaskStatus;
import com.emilio.taskmanager.repository.TaskRepository;
import com.emilio.taskmanager.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

        private final TaskRepository taskRepository;
        private final UserRepository userRepository;

        public TaskResponse createTask(TaskRequest request) {

                User assignedUser = userRepository.findById(request.getAssignedUserId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Usuario no encontrado con id: " + request.getAssignedUserId()));

                Task task = Task.builder()
                                .title(request.getTitle())
                                .description(request.getDescription())
                                .status(request.getStatus())
                                .assignedUser(assignedUser)
                                .build();

                Task savedTask = taskRepository.save(task);
                return mapToTaskResponse(savedTask);
        }

        public List<TaskResponse> getAllTasks() {
                return taskRepository.findAll()
                                .stream()
                                .map(this::mapToTaskResponse)
                                .toList();
        }

        public TaskResponse getTaskById(Long id) {
                Task task = taskRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));

                return mapToTaskResponse(task);
        }

        public TaskResponse updateTask(Long id, TaskRequest request) {
                Task existingTask = taskRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));

                User assignedUser = userRepository.findById(request.getAssignedUserId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Usuario no encontrado con id: " + request.getAssignedUserId()));

                existingTask.setTitle(request.getTitle());
                existingTask.setDescription(request.getDescription());
                existingTask.setStatus(request.getStatus());
                existingTask.setAssignedUser(assignedUser);

                Task updatedTask = taskRepository.save(existingTask);
                return mapToTaskResponse(updatedTask);
        }

        public void deleteTask(Long id) {
                Task task = taskRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));

                taskRepository.delete(task);
        }

        public List<TaskResponse> getTasksByAssignedUser(Long userId) {
                return taskRepository.findByAssignedUserIdOrderByIdAsc(userId)
                                .stream()
                                .map(this::mapToTaskResponse)
                                .toList();
        }

        public List<TaskResponse> getTasksByStatus(TaskStatus status) {
                return taskRepository.findByStatus(status)
                                .stream()
                                .map(this::mapToTaskResponse)
                                .toList();
        }

        public List<TaskResponse> getTasksByAssignedUserAndStatus(Long userId, TaskStatus status) {
                return taskRepository.findByAssignedUserIdAndStatus(userId, status)
                                .stream()
                                .map(this::mapToTaskResponse)
                                .toList();
        }

        public List<TaskResponse> getMyTasks(Authentication authentication) {
                User currentUser = getAuthenticatedUser(authentication);

                return taskRepository.findByAssignedUserIdOrderByIdAsc(currentUser.getId())
                                .stream()
                                .map(this::mapToTaskResponse)
                                .toList();
        }

        public TaskResponse updateMyTaskStatus(Long taskId,
                        TaskStatusUpdateRequest request,
                        Authentication authentication) {
                User currentUser = getAuthenticatedUser(authentication);

                Task task = taskRepository.findByIdAndAssignedUserId(taskId, currentUser.getId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Tarea no encontrada o no pertenece al usuario autenticado"));

                task.setStatus(request.getStatus());

                Task updatedTask = taskRepository.save(task);
                return mapToTaskResponse(updatedTask);
        }

        private User getAuthenticatedUser(Authentication authentication) {
                String email = authentication.getName();

                return userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Usuario autenticado no encontrado"));
        }

        private TaskResponse mapToTaskResponse(Task task) {
                UserResponse assignedUserResponse = null;

                if (task.getAssignedUser() != null) {
                        assignedUserResponse = UserResponse.builder()
                                        .id(task.getAssignedUser().getId())
                                        .name(task.getAssignedUser().getName())
                                        .email(task.getAssignedUser().getEmail())
                                        .role(task.getAssignedUser().getRole())
                                        .build();
                }

                return TaskResponse.builder()
                                .id(task.getId())
                                .title(task.getTitle())
                                .description(task.getDescription())
                                .status(task.getStatus())
                                .createdAt(task.getCreatedAt())
                                .updatedAt(task.getUpdatedAt())
                                .assignedUser(assignedUserResponse)
                                .build();
        }
}