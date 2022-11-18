import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FluxoDeTrabalhoCadastroComponent } from './fluxo-de-trabalho-cadastro/fluxo-de-trabalho-cadastro.component';
import { FluxoDeTrabalhoCadastroModule } from './fluxo-de-trabalho-cadastro/fluxo-de-trabalho-cadastro.module';
import { FluxoDeTrabalhoListaComponent } from './fluxo-de-trabalho-lista/fluxo-de-trabalho-lista.component';
import { FluxoDeTrabalhoListaModule } from './fluxo-de-trabalho-lista/fluxo-de-trabalho-lista.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FluxoDeTrabalhoCadastroModule,
    FluxoDeTrabalhoListaModule,
  ],
  exports: [FluxoDeTrabalhoCadastroComponent, FluxoDeTrabalhoListaComponent],
})
export class FluxoDeTrabalhoModule {}
