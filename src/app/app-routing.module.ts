import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './forms/clientes/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './forms/clientes/cliente-lista/cliente-lista.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'clientes',
    component: ClienteListaComponent,
  },
  {
    path: 'clientes/:identifier',
    component: ClienteFormComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
