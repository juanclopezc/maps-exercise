import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from './header/header.module';

import { LayoutComponent } from './layout.component';




@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
