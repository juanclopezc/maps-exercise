import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerModule } from './banner/banner.module';
import { SnackbarModule } from './snackbar/snackbar.module';

import { AlertsService } from './alerts.service';


@NgModule({
  providers: [AlertsService],
  imports: [
    CommonModule,
    BannerModule,
    SnackbarModule
  ],
  exports: [BannerModule]
})
export class AlertsModule { }
