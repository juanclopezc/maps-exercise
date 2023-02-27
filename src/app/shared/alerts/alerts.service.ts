import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Banner } from '../interfaces/banner.interface';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: Overlay) { }

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

  //Dialog
  openDialog(options?: any) {
    let global_options = {
      disableClose: true,
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    };
    let dialog_config = {...global_options, ...options};
    let dialog_ref = this.dialog.open(
      DialogComponent,
      dialog_config
    );

    return dialog_ref;
  }

}