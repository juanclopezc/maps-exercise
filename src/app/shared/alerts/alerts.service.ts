import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Banner } from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

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
}
