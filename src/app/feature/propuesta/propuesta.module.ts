import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PropuestaRoutingModule } from './propuesta-routing.module';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { ListarPropuestaComponent } from './components/listar-propuesta/listar-propuesta.component';
import { ListarLicitacionPublicaComponent } from './components/listar-licitacion-publica/listar-licitacion-publica.component';
import { HttpService } from '@core/services/http.service';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { PropuestaService } from './shared/service/propuesta.service';
import { EditarPropuestaComponent } from './components/editar-propuesta/editar-propuesta.component';
import { VerPropuestaComponent } from './components/ver-propuesta/ver-propuesta.component';
import { PropuestaRequerimientoService } from '../propuesta-requerimiento/shared/service/propuesta-requerimiento.service';
import { RequerimientoService } from '../requerimiento/shared/service/requerimiento.service';
import { PropuestaRequerimientoComponent } from '../propuesta-requerimiento/components/propuesta-requerimiento/propuesta-requerimiento.component';

@NgModule({
  declarations: [
    PropuestaComponent,
    CrearPropuestaComponent,
    ListarPropuestaComponent,
    ListarLicitacionPublicaComponent,
    EditarPropuestaComponent,
    VerPropuestaComponent,
    PropuestaRequerimientoComponent
  ],
  imports: [
    PropuestaRoutingModule,
    SharedModule
  ],
  providers: [HttpService, LicitacionService, PropuestaService, RequerimientoService, PropuestaRequerimientoService]
})
export class PropuestaModule { }
