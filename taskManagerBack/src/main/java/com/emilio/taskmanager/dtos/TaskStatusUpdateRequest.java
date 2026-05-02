package com.emilio.taskmanager.dtos;

import com.emilio.taskmanager.entity.enums.TaskStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatusUpdateRequest {
    @NotNull(message = "El estado es obligatorio")
    private TaskStatus status;
}