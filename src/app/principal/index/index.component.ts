import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';
import { Character } from '@entities/*';
import { PersonajesAPIService,ModalServiceService } from '@services/*';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy{

  private _currentPage:number=1;
  private _character:Character= new Character();
  private _characters: Character[]=[];
  private _subscriptionObtenerCharacter!:Subscription;

  constructor(private personajesAPIService:PersonajesAPIService, private modalService:ModalServiceService){


  }

  ngOnInit(){
    this._subscriptionObtenerCharacter=this.personajesAPIService.characters$.subscribe(updatedCharacters => {
      this._characters = updatedCharacters;
    });
  }

  ngOnDestroy(){
    if(this._subscriptionObtenerCharacter){
      this._subscriptionObtenerCharacter.unsubscribe();
    }
  }

 
  getCharacters(){
    return this._characters;
  }
  llamarApi() {
    this._subscriptionObtenerCharacter=this.personajesAPIService.getCharacterPrueba().subscribe();
  
    this._currentPage++;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 200) {
      this.llamarApi();
    }
  }

editar(character:Character){
  this._character=character
  this.modalService.abrirModalEditarCharacter();

}

getModalEditar(){
  return this.modalService.getModalEditar();
}

getCharacter(){

return this._character;
}
getCurrentPage(){
  return this._currentPage;
}
}