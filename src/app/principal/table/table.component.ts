import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/shared/entities';
import { PersonajesAPIService } from 'src/app/shared/services/personajes-api.service';
import { ResetService } from 'src/app/shared/services/reset.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{
  numero: number = 10;  // Puedes establecer el valor inicial según tus necesidades
  private _subscriptionObtenerCharacter!:Subscription;
  private _subscriptionResetComponentTable!:Subscription;
  // Funciones de incremento y decremento
  
  private _characters: Character[]=[];
  constructor(private personajesAPIService:PersonajesAPIService, private resetService:ResetService) {

  }
  ngOnDestroy(): void {
    if(this._subscriptionObtenerCharacter){
      this._subscriptionObtenerCharacter.unsubscribe();
    }
    if(this._subscriptionResetComponentTable){
      this._subscriptionResetComponentTable.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.inicializarComponente();

   this._subscriptionResetComponentTable= this.resetService.getResetComponentTable().subscribe((numeroSeleccionado) => {
      this.numero = numeroSeleccionado.number;
      this.llamarPersonajes();
    });

  }
  private inicializarComponente(){
    this.llamarPersonajes();
  }

llamarPersonajes(){

  this._subscriptionObtenerCharacter= this.personajesAPIService.obtenerPersonajes(this.numero).subscribe(updatedCharacters => {
    console.log(updatedCharacters);
    this._characters = updatedCharacters;
  });
}
  
  

  getCharacters(){
    return this._characters;
  }
  cambiarNumero() {
      this.resetService.resetComponentTable(this.numero);
    // Aquí puedes llamar a tu función con this.numeroSeleccionado como argumento
  }
  incrementar(){
    this.numero = Math.min(100, this.numero + 1);
    this.resetService.resetComponentTable(this.numero);
  }
  decrementar(){
    this.numero = Math.max(1, this.numero - 1);
    this.resetService.resetComponentTable(this.numero);
  }
  
}
