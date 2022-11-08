import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm/confirm.component';
import { ConfirmModule } from './confirm/confirm.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ConfirmModule],
  exports: [ConfirmDialogComponent],
})
export class ModalsModule {}
