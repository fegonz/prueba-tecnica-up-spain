import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { IndexComponent } from './index/index.component';
import { TableComponent } from './table/table.component';

import { CustomDatePipe } from '../shared/pipes/custom-date.pipe';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalEditarComponent } from './shared/componentes-del-modulo/modal-editar/modal-editar.component';
import { AliveDeadComponent } from './shared/componentes-del-modulo/alive-dead/alive-dead.component';



@NgModule({
  declarations: [
    IndexComponent,
    TableComponent,
    AliveDeadComponent,
    CustomDatePipe,
    InicioSesionComponent,
    ModalEditarComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule,
    
  ],
  schemas: [NO_ERRORS_SCHEMA],

  
})
export default class PrincipalModule { }
