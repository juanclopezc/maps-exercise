import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { PolygonCompleted, PolygonSaveData } from '../../interfaces';

import { v4 as uuidv4 } from 'uuid';
import { PolygonService } from '../../services/polygon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('googleMap') googleMap!: ElementRef;

  public search: string = '';
  public data: PolygonSaveData[] = [];

  public polygonsCompleted: PolygonCompleted[] = [];
  private selectedPolygon!: PolygonCompleted;
  
  public hideDrawingControls = true;
  private map!: google.maps.Map;
  private drawingManager!: google.maps.drawing.DrawingManager;

  constructor(private _alertsService: AlertsService,
    private _polygonService: PolygonService){}

  ngAfterViewInit(){
    const mapProperties = {
      center: new google.maps.LatLng(23, -102),
      mapTypeId: 'hybrid',
      zoom: 5
    };

    this.map = new google.maps.Map(
      this.googleMap?.nativeElement,
      mapProperties
    );

    this.drawingManager = new google.maps.drawing.DrawingManager({
      polygonOptions: {
        draggable: false,
        fillColor: "#2abc8b",
        fillOpacity: 0.2,
        strokeWeight: 2,
        strokeColor: "#2abc8b",
        editable: true,
        zIndex: 1
      },
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ],
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    });

    google.maps.event.addListener(this.drawingManager, "overlaycomplete", (e: any) => {
      let newFigure = e.overlay;
      newFigure.type = e.type;
      newFigure.id = uuidv4();

      this.selectPolygon(newFigure);

      this.openDialogSavePolygon((newPolygoneName: string) => {
        newFigure.name = newPolygoneName;

        google.maps.event.addListener(newFigure, "click", () => {
          this.selectPolygon(newFigure);
        });
  
        let path = newFigure.getPath();
        google.maps.event.addListener(path, "insert_at", () => {
          this.setPolygonLabels(newFigure);          
          // Update service
        });
        google.maps.event.addListener(path, "set_at", () => {
          this.setPolygonLabels(newFigure);
          // Update service
        });
        this.setPolygonLabels(newFigure, newPolygoneName);
        
        this.hideControls();        

        this.polygonsCompleted.push(newFigure);
        this.saveData(newFigure);        
      },()=> {
        this.deletePolygon(newFigure.id);
      })
    });

    this.getData();
  }

  getData(){
    this.data = this._polygonService.getData();

    for(let a = 0; a < this.data.length; a++){
      const variable: PolygonCompleted = new google.maps.Polygon({
        paths: this.data[a].coordinates,
        draggable: false,
        fillColor: "#5f6577",
        fillOpacity: 0.2,
        strokeWeight: 2,
        strokeColor: "#5f6577",
        editable: true,
        zIndex: 1        
      });
      variable.id = this.data[a].id;
      variable.setMap(this.map);
      this.polygonsCompleted.push(variable);

      let path = variable.getPath();
      google.maps.event.addListener(variable, "click", () => {
        this.selectPolygon(variable);
      });
      google.maps.event.addListener(path, "insert_at", () => {
        this.setPolygonLabels(variable, this.data[a].name);
        // Update service
      });
      google.maps.event.addListener(path, "set_at", () => {
        this.setPolygonLabels(variable, this.data[a].name);
        // Update service
      });
      this.setPolygonLabels(variable, this.data[a].name);
    }
  }

  saveData(polygonCompleted: any){
    this._polygonService.saveData(polygonCompleted);

    this._alertsService.openSnackBar(
      {
        data: {
          snackbarClass: 'snackbar-success',
          message: 'Guardado correcto'
        }
      }
    );
  }

  selectPolygon(polygonCompleted: PolygonCompleted) {
    if(this.selectedPolygon){
      this.selectedPolygon.setOptions({ fillColor: "#5f6577", strokeColor: "#5f6577" });
    }
    this.selectedPolygon = polygonCompleted;
    this.selectedPolygon.setOptions({ fillColor: "#2abc8b", strokeColor: "#2abc8b" });
  }

  hideControls(){
    this.hideDrawingControls = !this.hideDrawingControls;

    if(this.hideDrawingControls){
      this.drawingManager.setMap(null);

      if(this.selectedPolygon){
        this.selectedPolygon.setOptions({ fillColor: "#2abc8b", strokeColor: "#2abc8b" });
      }
    } else {
      this.drawingManager.setMap(this.map);
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

      if(this.selectedPolygon){
        this.selectedPolygon.setOptions({ fillColor: "#5f6577", strokeColor: "#5f6577" });
      }
    }
  }

  deletePolygon(id: string){
    this.selectedPolygon.setMap(null);

    if (!this.selectedPolygon.labels){
      this.selectedPolygon.labels = [];
    }
    for (let i = 0; i < this.selectedPolygon.labels.length; i++) {
      this.selectedPolygon.labels[i].setMap(null);
    }
    this.selectedPolygon.labels = [];

    this.polygonsCompleted = this.polygonsCompleted.filter((obj) => obj.id !== id);
    this._polygonService.deleteData(id);
  }

  setPolygonLabels(shape: PolygonCompleted, name?: string){
    if (!shape.labels){
      shape.labels = [];
    }
    for (let i = 0; i < shape.labels.length; i++) {
      shape.labels[i].setMap(null);
    }
    shape.labels = [];

    if(name){
      shape.name = name;
    } else {
      shape.name = 'Sin Nombre';
    }

    let path = shape.getPath();
    let points = path.getArray();

    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    let boundsCenter = bounds.getCenter();

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const centerLabel = new google.maps.Marker({
      position: boundsCenter,
      label: {
        text: shape.name,
        color: 'white',
        fontSize: '14px'
      },
      map: this.map,
      icon: image
    });


    shape.labels.push(centerLabel);
    centerLabel.set("position", bounds.getCenter());
    centerLabel.set("text", 'Hola');
  }

  openDialogSavePolygon(action_method: any, cancel_method: any){
    this._alertsService.openDialog({
      width: '25rem',
      data:{
        title: "Guardar poligono",
        message: "Asignar un nombre al poligono",
        dismiss_text: 'Cancelar',
        action_text: 'Guardar',
        input_polygon: true,
        action: (a:any) => {
          action_method(a);
        },
        cancel: () => {
          cancel_method();
        }
      }
    });
  }
}
