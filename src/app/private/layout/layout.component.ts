import { Component } from '@angular/core';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private _alertsService: AlertsService){
    setTimeout(() => {
      this.showBanner();
      setTimeout(() => {
        this.hideBanner();
      }, 3000);
    }, 500);
  }

  showBanner(){
    this._alertsService.BannerObservableData = {
      show: true,
      text: 'Bienvenido',
      bgColor: 'bg-success'
    }
  }

  hideBanner(){
    this._alertsService.BannerObservableData = {
      show: false,
      text: '',
      bgColor: ''
    }
  }

}
