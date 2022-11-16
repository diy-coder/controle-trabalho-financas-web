import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeTrackerCadastroComponent } from './time-tracker-cadastro/time-tracker-cadastro.component';
import { TimeTrackerCadastroModule } from './time-tracker-cadastro/time-tracker-cadastro.module';
import { TimeTrackerVisualizacaoComponent } from './time-tracker-visualizacao/time-tracker-visualizacao.component';
import { TimeTrackerVisualizacaoModule } from './time-tracker-visualizacao/time-tracker-visualizacao.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimeTrackerCadastroModule,
    TimeTrackerVisualizacaoModule,
  ],
  exports: [TimeTrackerCadastroComponent, TimeTrackerVisualizacaoComponent],
})
export class TimeTrackerModule {}
