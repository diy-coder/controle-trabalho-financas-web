import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteFormModule } from './clientes/cliente-form/cliente-form.module';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteListaModule } from './clientes/cliente-lista/cliente-lista.module';
import { FluxoDeCaixaCadastroComponent } from './fluxo-de-caixa/fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.component';
import { FluxoDeCaixaCadastroModule } from './fluxo-de-caixa/fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.module';
import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa/fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.component';
import { FluxoDeCaixaVisualizacaoModule } from './fluxo-de-caixa/fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.module';
import { MetaFormComponent } from './metas/meta-form/meta-form.component';
import { MetaFormModule } from './metas/meta-form/meta-form.module';
import { MetaListComponent } from './metas/meta-list/meta-list.component';
import { MetaListModule } from './metas/meta-list/meta-list.module';
import { ProjetoFormComponent } from './projetos/projeto-form/projeto-form.component';
import { ProjetoFormModule } from './projetos/projeto-form/projeto-form.module';
import { ProjetoListaComponent } from './projetos/projeto-lista/projeto-lista.component';
import { ProjetoListaModule } from './projetos/projeto-lista/projeto-lista.module';

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
    FluxoDeCaixaCadastroModule,
    FluxoDeCaixaVisualizacaoModule,
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
  ],
})
export class FormsModule {}
