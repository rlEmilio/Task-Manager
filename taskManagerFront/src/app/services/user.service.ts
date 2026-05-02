import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
private apiUrl = 'http://localhost:8081/taskmanager'

   constructor(private http: HttpClient) {}

  

getProfile() {
  return this.http.get(`${this.apiUrl}/users/me`);
}
getAllUsers(): Observable<UserResponse[]> {
  return this.http.get<UserResponse[]>(`${this.apiUrl}/admin/users`);
}

}