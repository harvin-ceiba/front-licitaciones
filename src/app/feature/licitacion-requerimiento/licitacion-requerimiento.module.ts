import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicitacionRequerimientoRoutingModule } from './licitacion-requerimiento-routing.module';
import { LicitacionRequerimientoService } from './shared/service/licitacion-requerimiento.service';
import { LicitacionRequerimientoComponent } from './components/licitacion-requerimiento/licitacion-requerimiento.component';
import { RequerimientoService } from '../requerimiento/shared/service/requerimiento.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LicitacionRequerimientoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LicitacionRequerimientoRoutingModule
  ],
  providers: [RequerimientoService, LicitacionRequerimientoService]
})
export class LicitacionRequerimientoModule { }
