import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabelasModule } from '../shared/tabelas/tabelas.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, TabelasModule],
  exports: [HomeComponent],
})
export class HomeModule {}
