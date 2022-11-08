import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteFormComponent } from './cliente-form.component';

@NgModule({
  declarations: [ClienteFormComponent],
  imports: [CommonModule],
  exports: [ClienteFormComponent],
})
export class ClienteFormModule {}
