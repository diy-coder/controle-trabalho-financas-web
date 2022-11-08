import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteFormModule } from './clientes/cliente-form/cliente-form.module';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteListaModule } from './clientes/cliente-lista/cliente-lista.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClienteFormModule, ClienteListaModule],
  exports: [ClienteFormComponent, ClienteListaComponent],
})
export class FormsModule {}
