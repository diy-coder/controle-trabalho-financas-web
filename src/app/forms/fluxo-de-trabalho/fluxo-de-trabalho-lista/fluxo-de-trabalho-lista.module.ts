import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { FluxoDeTrabalhoListaComponent } from './fluxo-de-trabalho-lista.component';

@NgModule({
  declarations: [FluxoDeTrabalhoListaComponent],
  imports: [CommonModule, TabelasModule],
  exports: [FluxoDeTrabalhoListaComponent],
})
export class FluxoDeTrabalhoListaModule {}
