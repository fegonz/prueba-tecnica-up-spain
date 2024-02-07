import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../entities';


@Injectable({
  providedIn: 'root'
})
export class PersonajesAPIService {

  private urlEndPoint:string='https://rickandmortyapi.com/api/character/';
  private currentPage:number=1;

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$: Observable<Character[]> = this.charactersSubject.asObservable();
  private page!: number;
  private totalPages!: number;
  constructor(private http: HttpClient) {
    this.page=1;
    
  }
  getCharacterPrueba(): Observable<any> {
    return this.http.get(`${this.urlEndPoint}?page=${this.page}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error al llamar la API'));
      }),
      tap((result: any) => {
        this.totalPages = result.info.pages;
        const updatedCharacters = [...this.charactersSubject.value, ...result.results];
        if(this.page < this.totalPages){
          this.page++;
          this.charactersSubject.next(updatedCharacters);
        }
       
      })
    );
  }

    
  obtenerPersonajes(numero: number): Observable<Character[]> {
    const url = `${this.urlEndPoint}${Array.from({ length: numero }, (_, i) => i + 1).join(',')}`;

    return this.http.get<Character[]>(url).pipe(
      catchError(error => {
        console.error(error.error.mensaje);
        return throwError(() => new Error('Error al buscar el número de usuarios'));
      })
    );
  }

  
}
