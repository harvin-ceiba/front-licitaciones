import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LicitacionRoutingModule } from './licitacion-routing.module';
import { LicitacionComponent } from './components/licitacion/licitacion.component';
import { ListarLicitacionComponent } from './components/listar-licitacion/listar-licitacion.component';
import { CrearLicitacionComponent } from './components/crear-licitacion/crear-licitacion.component';
import { VerLicitacionComponent } from './components/ver-licitacion/ver-licitacion.component';
import { EditarLicitacionComponent } from './components/editar-licitacion/editar-licitacion.component';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { HttpService } from '@core/services/http.service';
import { LicitacionRequerimientoComponent } from '../licitacion-requerimiento/components/licitacion-requerimiento/licitacion-requerimiento.component';
import { RequerimientoService } from '../requerimiento/shared/service/requerimiento.service';
import { LicitacionRequerimientoService } from '../licitacion-requerimiento/shared/service/licitacion-requerimiento.service';

@NgModule({
  declarations: [
    LicitacionComponent,
    ListarLicitacionComponent,
    CrearLicitacionComponent,
    VerLicitacionComponent,
    EditarLicitacionComponent,
    LicitacionRequerimientoComponent
  ],
  imports: [
    LicitacionRoutingModule,
    SharedModule
  ],
  providers: [HttpService, LicitacionService, PropuestaService, RequerimientoService, LicitacionRequerimientoService]
})
export class LicitacionModule { }
