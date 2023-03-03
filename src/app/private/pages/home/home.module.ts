import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    GoogleMapsModule,
    MatButtonModule,
    MatSidenavModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
