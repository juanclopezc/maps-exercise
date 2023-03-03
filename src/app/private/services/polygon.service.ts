import { Injectable } from '@angular/core';

import { PolygonSaveData } from '../interfaces';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {

  public data: PolygonSaveData[] = [];

  constructor() { }

  getData(){
    if (localStorage.getItem("polygons") === null) {
      return [];
    } else {
      return this.data = JSON.parse(localStorage.getItem("polygons") || '');
    }
  }

  saveData(polygonCompleted: any){    
    let newPolygon: PolygonSaveData = {
      id: uuidv4(),
      name: polygonCompleted.name || '',
      coordinates: polygonCompleted.getPath().getArray()
    }
    this.data.push(newPolygon);

    localStorage.removeItem('polygons');
    localStorage.setItem('polygons', JSON.stringify(this.data));
  }

  deleteData(id: string){
    this.data = this.data.filter((obj) => obj.id !== id);
    
    localStorage.removeItem('polygons');
    localStorage.setItem('polygons', JSON.stringify(this.data));
  }

  updateData(polygonCompleted: any){
  }

}