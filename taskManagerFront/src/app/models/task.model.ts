export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  assignedUser: UserResponse;
}

export interface TaskRequest {
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedUserId: number;
}

export interface TaskStatusUpdateRequest {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}