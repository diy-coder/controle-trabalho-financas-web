import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetaFormComponent } from './meta-form/meta-form.component';
import { MetaFormModule } from './meta-form/meta-form.module';
import { MetaListComponent } from './meta-list/meta-list.component';
import { MetaListModule } from './meta-list/meta-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MetaFormModule, MetaListModule],
  exports: [MetaFormComponent, MetaListComponent],
})
export class MetasModule {}
