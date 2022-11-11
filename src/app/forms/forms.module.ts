import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteFormModule } from './clientes/cliente-form/cliente-form.module';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteListaModule } from './clientes/cliente-lista/cliente-lista.module';
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
  ],
  exports: [
    ClienteFormComponent,
    ClienteListaComponent,
    ProjetoListaComponent,
    ProjetoFormComponent,
  ],
})
export class FormsModule {}
