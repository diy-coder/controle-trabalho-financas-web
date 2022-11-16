import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/signin/signin.component';
import { ClienteFormComponent } from './forms/clientes/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './forms/clientes/cliente-lista/cliente-lista.component';
import { FluxoDeCaixaCadastroComponent } from './forms/fluxo-de-caixa/fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.component';
import { FluxoDeCaixaVisualizacaoComponent } from './forms/fluxo-de-caixa/fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.component';
import { MetaFormComponent } from './forms/metas/meta-form/meta-form.component';
import { MetaListComponent } from './forms/metas/meta-list/meta-list.component';
import { ProjetoFormComponent } from './forms/projetos/projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './forms/projetos/projeto-lista/projeto-lista.component';
import { TimeTrackerCadastroComponent } from './forms/time-tracker/time-tracker-cadastro/time-tracker-cadastro.component';
import { TimeTrackerVisualizacaoComponent } from './forms/time-tracker/time-tracker-visualizacao/time-tracker-visualizacao.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes',
    component: ClienteListaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/:identifier',
    component: ClienteFormComponent,
  },
  {
    path: 'projetos',
    component: ProjetoListaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projetos/:identifier',
    component: ProjetoFormComponent,
  },
  {
    path: 'metas',
    component: MetaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'metas/:identifier',
    component: MetaFormComponent,
  },
  {
    path: 'fluxo-de-caixa-cadastro',
    component: FluxoDeCaixaCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fluxo-de-caixa-listagem',
    component: FluxoDeCaixaVisualizacaoComponent,
  },
  {
    path: 'time-tracker-cadastro',
    component: TimeTrackerCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'time-tracker-listagem',
    component: TimeTrackerVisualizacaoComponent,
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
