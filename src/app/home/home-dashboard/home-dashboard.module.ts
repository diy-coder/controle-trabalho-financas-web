import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeDashboardComponent } from './home-dashboard.component';

@NgModule({
  declarations: [HomeDashboardComponent],
  imports: [CommonModule],
  exports: [HomeDashboardComponent],
})
export class HomeDashboardModule {}
