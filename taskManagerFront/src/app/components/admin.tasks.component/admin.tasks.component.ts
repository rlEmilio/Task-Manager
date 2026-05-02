import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskRequest, TaskResponse, UserResponse } from '../../models/task.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.tasks.component.html',
  styleUrl: './admin.tasks.component.css',
})
export class AdminTasksComponent implements OnInit {
  tasks = signal<TaskResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  users = signal<UserResponse[]>([]);
  titleError = signal<string | null>(null);
  descriptionError = signal<string | null>(null);
  assignedUserError = signal<string | null>(null);
  statusError = signal<string | null>(null);

  editingTaskId = signal<number | null>(null);

  formTask: TaskRequest = {
    title: '',
    description: '',
    status: 'PENDING',
    assignedUserId: 0,
  };

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al cargar las tareas');
        this.loading.set(false);
      },
    });
  }

  saveTask(): void {
    if (!this.validateTaskForm()) {
      return;
    }
    if (this.editingTaskId()) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask(): void {
    this.taskService.createTask(this.formTask).subscribe({
      next: () => {
        this.resetForm();
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al crear la tarea');
      },
    });
  }

  editTask(task: TaskResponse): void {
    this.editingTaskId.set(task.id);

    this.formTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      assignedUserId: task.assignedUser.id,
    };
  }

  updateTask(): void {
    const id = this.editingTaskId();
    if (!id) return;

    this.taskService.updateTask(id, this.formTask).subscribe({
      next: () => {
        this.resetForm();
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al actualizar la tarea');
      },
    });
  }

  deleteTask(id: number): void {
    const confirmDelete = confirm('¿Seguro que quieres eliminar esta tarea?');
    if (!confirmDelete) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al eliminar la tarea');
      },
    });
  }

  resetForm(): void {
    this.editingTaskId.set(null);

    this.formTask = {
      title: '',
      description: '',
      status: 'PENDING',
      assignedUserId: 0,
    };
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'IN_PROGRESS':
        return 'En progreso';
      case 'COMPLETED':
        return 'Completada';
      default:
        return status;
    }
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al cargar usuarios');
      },
    });
  }

  validateTaskForm(): boolean {
    this.titleError.set(this.validationService.validateTaskTitle(this.formTask.title));

    this.descriptionError.set(
      this.validationService.validateTaskDescription(this.formTask.description),
    );

    this.assignedUserError.set(
      this.validationService.validateAssignedUser(this.formTask.assignedUserId),
    );

    this.statusError.set(this.validationService.validateStatus(this.formTask.status));

    return (
      !this.titleError() &&
      !this.descriptionError() &&
      !this.assignedUserError() &&
      !this.statusError()
    );
  }
}
