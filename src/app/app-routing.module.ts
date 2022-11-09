import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/signin/signin.component';
import { ClienteFormComponent } from './forms/clientes/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './forms/clientes/cliente-lista/cliente-lista.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'clientes',
    component: ClienteListaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'clientes/:identifier',
    component: ClienteFormComponent,
  },
  {
    path: 'sign-in',
    component: SigninComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
