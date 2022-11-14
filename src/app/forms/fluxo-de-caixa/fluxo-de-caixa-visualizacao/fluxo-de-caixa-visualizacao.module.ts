import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa-visualizacao.component';

@NgModule({
  declarations: [FluxoDeCaixaVisualizacaoComponent],
  imports: [CommonModule, MatIconModule],
  exports: [FluxoDeCaixaVisualizacaoComponent],
})
export class FluxoDeCaixaVisualizacaoModule {}
