import{Injectable} from '@angular/core';
import{HttpEvent, HttpInterceptor, HttpHandler, HttpRequest }  from '@angular/common/http';
import{Observable, throwError} from 'rxjs';
import swal from 'sweetalert2';
import{catchError} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private router:Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>>{

    return next.handle(req).pipe(
      catchError(e =>{
            if(e.status==401){
            
              this.router.navigate(['/']);
            }


              if(e.status==403){
                    swal.fire('Acceso denegado', `Hola no tienes acceso a esta página`, 'warning' );
                    this.router.navigate(['/']);

              }

              return throwError(() => new Error('Error en el interceptor'));



      })


    )

  }
}


