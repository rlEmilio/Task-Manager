import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validateEmail(email: string): string | null {
    if (!email.trim()) return 'El email es obligatorio';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return 'Introduce un email válido';
    }

    return null;
  }

 validateLoginPassword(password: string): string | null {
  if (!password.trim()) {
    return 'La contraseña es obligatoria';
  }

  return null;
}

validateRegisterPassword(password: string): string | null {
  if (!password.trim()) {
    return 'La contraseña es obligatoria';
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/;

  if (!passwordRegex.test(password)) {
    return 'La contraseña debe tener mínimo 7 caracteres, mayúscula, minúscula, número y carácter especial';
  }

  return null;
}

  validateName(name: string): string | null {
    if (!name.trim()) return 'El nombre es obligatorio';

    if (name.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    return null;
  }

  validateTaskTitle(title: string): string | null {
  if (!title.trim()) return 'El título es obligatorio';

  if (title.trim().length < 3) {
    return 'El título debe tener al menos 3 caracteres';
  }

  if (title.trim().length > 100) {
    return 'El título no puede superar los 100 caracteres';
  }

  return null;
}

validateTaskDescription(description: string): string | null {
  if (!description.trim()) return 'La descripción es obligatoria';

  if (description.trim().length < 5) {
    return 'La descripción debe tener al menos 5 caracteres';
  }

  if (description.trim().length > 500) {
    return 'La descripción no puede superar los 500 caracteres';
  }

  return null;
}

validateAssignedUser(assignedUserId: number): string | null {
  if (!assignedUserId || assignedUserId <= 0) {
    return 'Debes asignar la tarea a un usuario';
  }

  return null;
}

validateStatus(status: string): string | null {
  const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  if (!validStatuses.includes(status)) {
    return 'Estado no válido';
  }

  return null;
}
}