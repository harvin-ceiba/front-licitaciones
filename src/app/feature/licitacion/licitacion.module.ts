import { NgModule } from '@angular/core';

import { LicitacionRoutingModule } from './licitacion-routing.module';
import { LicitacionComponent } from './components/licitacion/licitacion.component';
import { ListarLicitacionComponent } from './components/listar-licitacion/listar-licitacion.component';
import { CrearLicitacionComponent } from './components/crear-licitacion/crear-licitacion.component';
import { SharedModule } from '@shared/shared.module';
import { LicitacionService } from './shared/service/licitacion.service';

@NgModule({
  declarations: [
    LicitacionComponent,
    ListarLicitacionComponent,
    CrearLicitacionComponent
  ],
  imports: [
    LicitacionRoutingModule,
    SharedModule
  ],
  providers: [LicitacionService]
})
export class LicitacionModule { }
