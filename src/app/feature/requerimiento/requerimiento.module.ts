import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequerimientoRoutingModule } from './requerimiento-routing.module';
import { RequerimientoService } from './shared/service/requerimiento.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RequerimientoRoutingModule
  ],
  providers: [RequerimientoService]
})
export class RequerimientoModule { }
