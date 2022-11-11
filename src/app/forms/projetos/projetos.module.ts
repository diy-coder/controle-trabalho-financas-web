import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoFormModule } from './projeto-form/projeto-form.module';
import { ProjetoListaComponent } from './projeto-lista/projeto-lista.component';
import { ProjetoListaModule } from './projeto-lista/projeto-lista.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProjetoListaModule, ProjetoFormModule],
  exports: [ProjetoListaComponent, ProjetoFormComponent],
})
export class ProjetosModule {}
