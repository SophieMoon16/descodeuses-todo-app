import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UtilisateurListComponent } from './components/utilisateur-list/utilisateur-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';

/* path: lien saisi dans la barre de navigation
   component: le composant relie a ce path
*/
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [authGuard],
  },
  {
    path: 'todo-list',
    component: TodoListComponent, //path vide car page par defaut
    canActivate: [authGuard],
  },
  {
    path: 'utilisateur-list',
    component: UtilisateurListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'todo-detail/:id',
    component: TodoDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'todo-table',
    component: TodoTableComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
