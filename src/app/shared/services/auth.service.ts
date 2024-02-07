import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token_bien:boolean = false;

  constructor(private router:Router) { }


  setToken(){
    this._token_bien = !this._token_bien;
  }
  getToken(){
    return this._token_bien;
  }

  redirectIndex(){
    this.router.navigate(['/inicio-sesion']);
  }
}
