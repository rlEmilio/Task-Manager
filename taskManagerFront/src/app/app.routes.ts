import { AdminTasksComponent } from './components/admin.tasks.component/admin.tasks.component';
import { HomeComponent } from './components/home.component/home.component';
import { LoginComponent } from './components/login.component/login.component';
import { RegisterComponent } from './components/register.component/register.component';
import { TasksComponent } from './components/tasks.component/tasks.component';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';


export const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TasksComponent, canActivate:[authGuard] },
   {path: 'admin', component: AdminTasksComponent, canActivate:[authGuard, adminGuard]}
];