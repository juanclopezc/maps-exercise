import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerModule } from './banner/banner.module';
import { AlertsService } from './alerts.service';


@NgModule({
  providers: [AlertsService],
  imports: [
    CommonModule,
    BannerModule
  ],
  exports: [BannerModule]
})
export class AlertsModule { }
