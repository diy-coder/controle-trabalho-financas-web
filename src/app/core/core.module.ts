import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule],
  exports: [SigninComponent],
})
export class CoreModule {}
