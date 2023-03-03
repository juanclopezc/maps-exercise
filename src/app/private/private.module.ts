import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutModule } from './layout/layout.module';
import { AlertsModule } from '../shared/alerts/alerts.module';


@NgModule({
  imports: [
    CommonModule,
    AlertsModule,
    LayoutModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
