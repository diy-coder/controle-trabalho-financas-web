import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadModule } from 'src/app/shared/file/upload/upload.module';
import { TabelasModule } from 'src/app/shared/tabelas/tabelas.module';
import { FluxoDeTrabalhoCadastroComponent } from './fluxo-de-trabalho-cadastro.component';

@NgModule({
  declarations: [FluxoDeTrabalhoCadastroComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    UploadModule,
    TabelasModule,
  ],
  exports: [FluxoDeTrabalhoCadastroComponent],
})
export class FluxoDeTrabalhoCadastroModule {}
