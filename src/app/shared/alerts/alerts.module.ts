import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerModule } from './banner/banner.module';
import { DialogModule } from './dialog/dialog.module';
import { SnackbarModule } from './snackbar/snackbar.module';

import { AlertsService } from './alerts.service';



@NgModule({
  providers: [AlertsService],
  imports: [
    CommonModule,
    BannerModule,
    DialogModule,
    SnackbarModule
  ],
  exports: [BannerModule]
})
export class AlertsModule { }
