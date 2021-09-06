import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropuestaRequerimientoRoutingModule } from './propuesta-requerimiento-routing.module';
import { PropuestaRequerimientoComponent } from './components/propuesta-requerimiento/propuesta-requerimiento.component';
import { RequerimientoService } from '../requerimiento/shared/service/requerimiento.service';
import { PropuestaRequerimientoService } from './shared/service/propuesta-requerimiento.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropuestaRequerimientoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PropuestaRequerimientoRoutingModule
  ],
  providers: [RequerimientoService, PropuestaRequerimientoService]
})
export class PropuestaRequerimientoModule { }
