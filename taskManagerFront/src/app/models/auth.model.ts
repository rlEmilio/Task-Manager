
export type Role = 'ADMIN' | 'USER';

export interface AuthResponse {
    token: string;
    message: string;
    email: string;
    name: string;
    role: Role;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}