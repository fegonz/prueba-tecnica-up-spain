import { Injectable } from '@angular/core';
import {  AbstractControl, FormGroup, ValidationErrors, } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  noWhiteSpace(control:AbstractControl):ValidationErrors|null{

    if(control.value && control.value.trim().length==0){
      return {whitespace:true};
    }
    return null;
  }

  fechaNoAnteriorHoy(fecha:AbstractControl):ValidationErrors|null{
    const fechaSeleccionada=new Date(fecha.value);
    const fechaHoy = new Date();
  
    if(fechaSeleccionada<=fechaHoy){
  
      return {fechaNoAnteriorHoy:true};
    }
    return null;
  }
  getErrorMessage(campo:string,errorPriorities:Record<string,string[]>, formGroup:FormGroup, errorMessages:Record<string,Record<string,string>>){
    const errorNames=errorPriorities[campo];

    for(const errorName of errorNames){
      
      if(formGroup.get(campo)?.hasError(errorName)){

        return errorMessages[campo][errorName];
      }

    }
    return '';
  }

  campoEsValido( campo: string, formGroup:FormGroup ) {

   return formGroup.controls[campo]?.errors && formGroup.controls[campo]?.touched;
 }

  
}
