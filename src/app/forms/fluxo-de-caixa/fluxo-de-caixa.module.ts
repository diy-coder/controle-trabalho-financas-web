import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FluxoDeCaixaCadastroComponent } from './fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.component';
import { FluxoDeCaixaCadastroModule } from './fluxo-de-caixa-cadastro/fluxo-de-caixa-cadastro.module';
import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.component';
import { FluxoDeCaixaVisualizacaoModule } from './fluxo-de-caixa-visualizacao/fluxo-de-caixa-visualizacao.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FluxoDeCaixaCadastroModule,
    FluxoDeCaixaVisualizacaoModule,
  ],
  exports: [FluxoDeCaixaCadastroComponent, FluxoDeCaixaVisualizacaoComponent],
})
export class FluxoDeCaixaModule {}
