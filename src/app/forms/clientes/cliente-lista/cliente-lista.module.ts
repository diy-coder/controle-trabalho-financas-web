import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteListaComponent } from './cliente-lista.component';

@NgModule({
  declarations: [ClienteListaComponent],
  imports: [CommonModule],
  exports: [ClienteListaComponent],
})
export class ClienteListaModule {}
