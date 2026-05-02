import { Component, OnInit, signal } from '@angular/core';
import { TaskResponse } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [CommonModule, FormsModule, RouterLink],
})
export class TasksComponent implements OnInit {

  tasks = signal<TaskResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadMyTasks();
  }

  loadMyTasks(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.taskService.getMyTasks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (tasks) => {
          this.tasks.set(tasks);
        },
        error: (err) => {
          if (err.status === 401 || err.status === 403) {
            this.errorMessage.set('Debes iniciar sesión para ver tus tareas.');
          } else {
            this.errorMessage.set('No se pudieron cargar las tareas.');
          }
        }
      });
  }

  updateStatus(taskId: number, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'): void {
    this.taskService.updateMyTaskStatus(taskId, { status }).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks =>
          tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      },
      error: () => {
        this.errorMessage.set('No se pudo actualizar el estado de la tarea');
      }
    });
  }


}