import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { ProjetoListaComponent } from './projeto-lista.component';

@NgModule({
  declarations: [ProjetoListaComponent],
  imports: [CommonModule, TabelasModule],
  exports: [ProjetoListaComponent],
})
export class ProjetoListaModule {}
