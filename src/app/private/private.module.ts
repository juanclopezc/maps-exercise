import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
