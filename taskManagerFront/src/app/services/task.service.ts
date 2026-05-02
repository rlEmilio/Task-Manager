import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequest, TaskResponse, TaskStatusUpdateRequest } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8081/taskmanager';

  constructor(private http: HttpClient) {}

  // USER
  getMyTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}/tasks/my-tasks`);
  }

  updateMyTaskStatus(taskId: number, request: TaskStatusUpdateRequest): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/tasks/${taskId}/status`, request);
  }

  // ADMIN
  getAllTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}/admin/tasks`);
  }

  createTask(request: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.apiUrl}/admin/tasks`, request);
  }

  updateTask(taskId: number, request: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.apiUrl}/admin/tasks/${taskId}`, request);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/tasks/${taskId}`);
  }
}