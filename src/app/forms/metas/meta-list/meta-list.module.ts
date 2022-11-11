import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { MetaListComponent } from './meta-list.component';

@NgModule({
  declarations: [MetaListComponent],
  imports: [CommonModule, TabelasModule],
  exports: [MetaListComponent],
})
export class MetaListModule {}
