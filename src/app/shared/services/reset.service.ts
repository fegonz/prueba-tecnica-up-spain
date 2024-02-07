import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private resetTableComponent= new Subject<any>();
  constructor() { }


  resetComponentTable(number:number){

    const args={number};
    this.resetTableComponent.next(args);
  }
  getResetComponentTable():Observable<any>{

    return this.resetTableComponent.asObservable();
  }
}
