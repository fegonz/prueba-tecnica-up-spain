import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  private _modalEditarCharacter:boolean=false;

  constructor() { }

  cerrarModalEditarCharacter(){
    this._modalEditarCharacter=false;
  }
  abrirModalEditarCharacter(){
    this._modalEditarCharacter=true;
  }

  getModalEditar(){
    return this._modalEditarCharacter;
  }
}
