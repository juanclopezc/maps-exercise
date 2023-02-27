import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private _router: Router,
    private _alertsService: AlertsService){}

  logOut(){
    this.openDialogCancelConfirmation( () => {
      this._router.navigate(['/']);
    })
  }

  openDialogCancelConfirmation(cancel_method: any){
    this._alertsService.openDialog({
      width: '25rem',
      data:{
        title: "Confirmar",
        message: "¿Desea cerrar su sesión?",
        dismiss_text: 'Cancelar',
        action_text: 'Cerrar',
        action: () => cancel_method()
      }
    });
  }

}
