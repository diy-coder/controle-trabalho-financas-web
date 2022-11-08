import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteFormComponent } from './cliente-form.component';

@NgModule({
  declarations: [ClienteFormComponent],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatButtonModule],
  exports: [ClienteFormComponent],
})
export class ClienteFormModule {}
