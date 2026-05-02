# 🧩 Task Manager App

Aplicación full stack de gestión de tareas con autenticación JWT, control de roles y arquitectura moderna.

---

## 🚀 Tecnologías

### Backend

* Java + Spring Boot
* Spring Security + JWT
* JPA / Hibernate
* PostgreSQL

### Frontend

* Angular (standalone components)
* Signals (gestión de estado reactivo)
* Bootstrap

---

## 🔐 Funcionalidades principales

* Registro y login de usuarios
* Autenticación mediante JWT
* Control de acceso por roles (USER / ADMIN)
* CRUD completo de tareas
* Asignación de tareas a usuarios
* Actualización de estado de tareas
* Validaciones en frontend y backend
* Manejo global de errores

---

## 👤 Roles

### USER

* Ver sus tareas asignadas
* Actualizar el estado de sus tareas

### ADMIN

* Crear, editar y eliminar tareas
* Asignar tareas a usuarios
* Ver todas las tareas del sistema

---

## 🧠 Arquitectura

Backend estructurado en capas:

* Controller → endpoints REST
* Service → lógica de negocio
* Repository → acceso a datos
* DTOs → comunicación segura con el frontend

Frontend con Angular moderno:

* Standalone components
* Signals para estado
* Interceptor HTTP para JWT

---

## 🔒 Seguridad

* Autenticación con JWT
* Contraseñas cifradas con BCrypt
* Protección de endpoints por roles
* Validación de datos en backend

---

## ⚙️ Configuración

Las credenciales no están incluidas en el repositorio.

Para ejecutar el backend, crea:

```txt
src/main/resources/application-local.properties
```

Ejemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
jwt.secret=tu_clave_secreta
```

Y asegúrate de tener activo:

```properties
spring.profiles.active=local
```

---

## ▶️ Ejecución

### Backend

```bash
cd taskmanagerback
mvn spring-boot:run
```

### Frontend

```bash
cd taskmanagerfront
npm install
ng serve
```

---

## 📌 Estado del proyecto

Aplicación funcional con autenticación, roles, gestión de tareas y validaciones completas.

Próximos pasos:

* Mejora de UI
* Despliegue en producción

---

## 💡 Autor

Proyecto desarrollado como portfolio para demostrar habilidades en desarrollo full stack con Java y Angular.
