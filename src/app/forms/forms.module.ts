import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClientesModule } from './clientes/clientes.module';
import { FluxoDeCaixaCadastroComponent } from './fluxo-de-caixa/fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.component';
import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa/fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.component';
import { FluxoDeCaixaModule } from './fluxo-de-caixa/fluxo-de-caixa.module';
import { FluxoDeTrabalhoCadastroComponent } from './fluxo-de-trabalho/fluxo-de-trabalho-cadastro/fluxo-de-trabalho-cadastro.component';
import { FluxoDeTrabalhoListaComponent } from './fluxo-de-trabalho/fluxo-de-trabalho-lista/fluxo-de-trabalho-lista.component';
import { FluxoDeTrabalhoModule } from './fluxo-de-trabalho/fluxo-de-trabalho.module';
import { MetaFormComponent } from './metas/meta-form/meta-form.component';
import { MetaListComponent } from './metas/meta-list/meta-list.component';
import { MetasModule } from './metas/metas.module';
import { ProjetoFormComponent } from './projetos/projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './projetos/projeto-lista/projeto-lista.component';
import { ProjetosModule } from './projetos/projetos.module';
import { TimeTrackerCadastroComponent } from './time-tracker/time-tracker-cadastro/time-tracker-cadastro.component';
import { TimeTrackerVisualizacaoComponent } from './time-tracker/time-tracker-visualizacao/time-tracker-visualizacao.component';
import { TimeTrackerModule } from './time-tracker/time-tracker.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientesModule,
    ProjetosModule,
    MetasModule,
    FluxoDeCaixaModule,
    TimeTrackerModule,
    FluxoDeTrabalhoModule,
  ],
  exports: [
    ClienteFormComponent,
    ClienteListaComponent,
    ProjetoListaComponent,
    ProjetoFormComponent,
    MetaFormComponent,
    MetaListComponent,
    FluxoDeCaixaCadastroComponent,
    FluxoDeCaixaVisualizacaoComponent,
    TimeTrackerCadastroComponent,
    TimeTrackerVisualizacaoComponent,
    FluxoDeTrabalhoCadastroComponent,
    FluxoDeTrabalhoListaComponent,
  ],
})
export class FormsModule {}
