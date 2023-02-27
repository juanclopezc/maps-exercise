import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Banner } from '../interfaces/banner.interface';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }

  //Banner
  private bannerObservablePrivate: BehaviorSubject<Banner> = new BehaviorSubject<Banner>({
    show: false,
    text: '',
    bgColor: ''
  });
  get bannerObservable(){
    return this.bannerObservablePrivate.asObservable();
  }
  set BannerObservableData(data: Banner){
    this.bannerObservablePrivate.next(data);
  }

  //Snackbar
  openSnackBar(options?: any) {
    let global_options = {
      duration: 4000,
      panelClass: options.data.snackbarClass
    };
    let snackbar_config = {...global_options, ...options};
    let snackbar_ref = this._snackBar.openFromComponent(SnackbarComponent, snackbar_config);

    return snackbar_ref;
  }

}