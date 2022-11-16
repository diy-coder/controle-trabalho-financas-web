import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteFormModule } from './clientes/cliente-form/cliente-form.module';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteListaModule } from './clientes/cliente-lista/cliente-lista.module';
import { FluxoDeCaixaCadastroComponent } from './fluxo-de-caixa/fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.component';
import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa/fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.component';
import { FluxoDeCaixaModule } from './fluxo-de-caixa/fluxo-de-caixa.module';
import { MetaFormComponent } from './metas/meta-form/meta-form.component';
import { MetaFormModule } from './metas/meta-form/meta-form.module';
import { MetaListComponent } from './metas/meta-list/meta-list.component';
import { MetaListModule } from './metas/meta-list/meta-list.module';
import { ProjetoFormComponent } from './projetos/projeto-form/projeto-form.component';
import { ProjetoFormModule } from './projetos/projeto-form/projeto-form.module';
import { ProjetoListaComponent } from './projetos/projeto-lista/projeto-lista.component';
import { ProjetoListaModule } from './projetos/projeto-lista/projeto-lista.module';
import { TimeTrackerCadastroComponent } from './time-tracker/time-tracker-cadastro/time-tracker-cadastro.component';
import { TimeTrackerVisualizacaoComponent } from './time-tracker/time-tracker-visualizacao/time-tracker-visualizacao.component';
import { TimeTrackerModule } from './time-tracker/time-tracker.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClienteFormModule,
    ClienteListaModule,
    ProjetoFormModule,
    ProjetoListaModule,
    MetaFormModule,
    MetaListModule,
    FluxoDeCaixaModule,
    TimeTrackerModule,
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
  ],
})
export class FormsModule {}
