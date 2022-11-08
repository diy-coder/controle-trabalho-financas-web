import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { ClienteListaComponent } from './cliente-lista.component';

@NgModule({
  declarations: [ClienteListaComponent],
  imports: [CommonModule, TabelasModule],
  exports: [ClienteListaComponent],
})
export class ClienteListaModule {}
