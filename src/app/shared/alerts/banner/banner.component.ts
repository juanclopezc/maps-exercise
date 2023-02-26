import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Banner } from '../../interfaces/banner.interface';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  public data$: Observable<Banner>;

  constructor(private _alertsService: AlertsService){
    this.data$ = this._alertsService.bannerObservable;
  }

  hideBanner(){
    this._alertsService.BannerObservableData = {
      show: false,
      text: '',
      bgColor: ''
    }
  }
  
}
