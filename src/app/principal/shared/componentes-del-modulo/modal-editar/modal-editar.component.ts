import { Component, Input, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '@entities/*';
import { ModalServiceService, PersonajesAPIService, ValidatorService } from '@services/*';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnChanges,OnDestroy{

  @Input() _character!: Character;
  private subscriptionEditCharacter!:Subscription;
  selectedStatus: string = '';

  miFormulario!: FormGroup;
 errorMessages={
   name:{
     required:'*El nombre  es requerido',
     minlength:'*Mínimo de 3 caracteres',
     maxlength:'*Máximo de 30 caracteres',
     whitespace:'*No pueden ser espacios en blanco'
   },
   status:{
     required:'*El status es requerido',
     minlength:'*Mínimo de 3 caracteres',
     maxlength:'*Máximo de 60 caracteres',
     whitespace:'*No pueden ser espacios en blanco'
   },
   species:{
     required:'*Species es requerido',
 
   },
   type:{
     required:'*El type es requerido',
     minlength:'*Mínimo de 3 caracteres',
     maxlength:'*Máximo de 20 caracteres',
     whitespace:'*No pueden ser espacios en blanco'
   },
   url:{
     required:'*La url es requerida',
     minlength:'*Mínimo de 2 caracteres',
     maxlength:'*Máximo de 60 caracteres',
     whitespace:'*No pueden ser espacios en blanco'
   },

 };
 errorPriorities={
   name:['required','minlength', 'maxlength','whitespace'],
   status:['required','minlength', 'maxlength','whitespace'],
   species:['required','minlength', 'maxlength','whitespace'],
   type:['required','minlength', 'maxlength','whitespace'],
   url:['required','minlength', 'maxlength','whitespace'],
 
 };
 
   constructor(private validatorService: ValidatorService, 
    private personajesAPIService:PersonajesAPIService,
      public modalService: ModalServiceService, private router: Router,private fb: FormBuilder,) {
 
 
 
 
 
 
 
 
      }

      ngOnChanges(changes: SimpleChanges): void {

        if(changes['_character']){
          this.selectedStatus = this._character.status;
          this.miFormulario=this.fb.group({
            name: [ this._character.name , [ Validators.required, Validators.minLength(3),Validators.maxLength(30),this.validatorService.noWhiteSpace ]  ],
            status: [ this._character.status,[ Validators.required, Validators.minLength(3),Validators.maxLength(60),this.validatorService.noWhiteSpace ]  ],
            species: [this._character.species , [ Validators.required  ]],
            type: [this._character.type, [ Validators.required, Validators.minLength(3),Validators.maxLength(100),this.validatorService.noWhiteSpace ] ],
            url: [this._character.url, [ Validators.required, Validators.minLength(2),Validators.maxLength(100),this.validatorService.noWhiteSpace ] ],
            
          }
         

         );
         console.log(this._character);

        }
        
   }
 
   ngOnDestroy():void{
 
 
     if(this.subscriptionEditCharacter){
       this.subscriptionEditCharacter.unsubscribe();
     }
   }
 
 
  
 
   cerrarModal() {
     this.modalService.cerrarModalEditarCharacter();
 
 
 
 
   }

   editar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }else{
      
      this.subscriptionEditCharacter=this.personajesAPIService.editarCharacter(this._character).subscribe({
       
      error: (e) =>{
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al editar",
          icon: "error"
        })
      },
      complete: () =>{
        Swal.fire({
          title: "Éxito",
          text: "Has editado correctamente",
          icon: "success"
        })
        this.modalService.cerrarModalEditarCharacter();
      }
      }
        
      );
      }

   

     
    
   
 
   }

   campoEsValido( campo: string ) {

    return this.validatorService.campoEsValido(campo, this.miFormulario);
   }
   
   getErrorMessage(campo:string){
    return this.validatorService.getErrorMessage(campo,this.errorPriorities,this.miFormulario, this.errorMessages);
   }

}
