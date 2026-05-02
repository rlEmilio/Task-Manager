import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private validationService: ValidationService,
  ) {}

login() {
  this.errorMessage.set(null); 
  
  this.emailError.set(this.validationService.validateEmail(this.email));
  this.passwordError.set(
    this.validationService.validateLoginPassword(this.password)
  );

  if (this.emailError() || this.passwordError()) {
    return;
  }

  const datos: LoginRequest = {
    email: this.email,
    password: this.password,
  };

  console.log('Intentando conectar con Spring...');

  this.authService.login(datos).subscribe({
    next: (response) => {
      console.log('Login correcto:', response);

      this.authService.saveToken(response.token);
      const role = this.authService.getRole();

      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/tasks']);
      }
    },
    error: (err) => {
      const mensajeError = err?.error?.message || 'Credenciales incorrectas';
      console.error('Detalles del error:', err);

      this.errorMessage.set(mensajeError);
    },
  });
}

  togglePassword() {
    this.showPassword.update((v) => !v);
  }


}
