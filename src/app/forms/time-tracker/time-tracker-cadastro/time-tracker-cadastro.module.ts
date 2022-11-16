import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { TimeTrackerCadastroComponent } from './time-tracker-cadastro.component';

@NgModule({
  declarations: [TimeTrackerCadastroComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TabelasModule,
  ],
  exports: [TimeTrackerCadastroComponent],
})
export class TimeTrackerCadastroModule {}
