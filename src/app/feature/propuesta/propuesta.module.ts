import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropuestaRoutingModule } from './propuesta-routing.module';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { ListarPropuestaComponent } from './components/listar-propuesta/listar-propuesta.component';


@NgModule({
  declarations: [
    PropuestaComponent,
    CrearPropuestaComponent,
    ListarPropuestaComponent
  ],
  imports: [
    CommonModule,
    PropuestaRoutingModule
  ]
})
export class PropuestaModule { }
