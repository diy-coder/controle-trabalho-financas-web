import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/signin/signin.component';
import { ClienteFormComponent } from './forms/clientes/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './forms/clientes/cliente-lista/cliente-lista.component';
import { ProjetoFormComponent } from './forms/projetos/projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './forms/projetos/projeto-lista/projeto-lista.component';
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
    path: 'projetos',
    component: ProjetoListaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'projetos/:identifier',
    component: ProjetoFormComponent,
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
