import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {

  constructor(private authService:AuthService){

  }
  autenticarte(){
    this.authService.setToken();  

  }

  isAutenticado(){
    return this.authService.getToken();
  }

}
