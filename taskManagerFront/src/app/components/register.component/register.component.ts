import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  nameError = signal<string | null>(null);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService,
  ) {}

register() {
  this.errorMessage.set(null); 

  this.emailError.set(this.validationService.validateEmail(this.email));
  this.passwordError.set(
    this.validationService.validateRegisterPassword(this.password)
  );
  this.nameError.set(this.validationService.validateName(this.name));

  if (this.emailError() || this.passwordError() || this.nameError()) {
    return;
  }

  const datos: RegisterRequest = {
    name: this.name,
    email: this.email,
    password: this.password,
  };

  this.authService.register(datos).subscribe({
    next: (response) => {
      console.log('¡Conexión exitosa! Respuesta de Spring:', response);

      this.router.navigate(['/login']);
    },
    error: (err) => {
      const mensajeError = err?.error?.message || 'Error al registrarse';
      console.error('Detalles del error:', err);

      this.errorMessage.set(mensajeError);
    },
  });
}

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
