import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteFormModule } from './cliente-form/cliente-form.module';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteListaModule } from './cliente-lista/cliente-lista.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClienteFormModule, ClienteListaModule],
  exports: [ClienteFormComponent, ClienteListaComponent],
})
export class ClientesModule {}
