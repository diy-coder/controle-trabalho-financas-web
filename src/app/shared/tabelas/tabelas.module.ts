import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TabelaComponent } from './tabela/tabela.component';
import { TabelaModule } from './tabela/tabela.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TabelaModule, MatDialogModule],
  exports: [TabelaComponent],
  providers: [DecimalPipe, CurrencyPipe],
})
export class TabelasModule {}
