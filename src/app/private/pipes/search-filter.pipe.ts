import { Pipe, PipeTransform } from '@angular/core';

interface newPolygon extends google.maps.Polygon {
  id?: string;
  name?: string;
  labels?: google.maps.Marker[];
}

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(polygons: newPolygon[], searchValue: string): unknown | any {
    if (polygons) {
      if (polygons && searchValue){
        return polygons.filter(polygon => {
          return (polygon.name) ? polygon.name.toLowerCase().includes(searchValue.toLowerCase()) : ''
        });
      }else {
        return polygons
      }
    }
  }
}
