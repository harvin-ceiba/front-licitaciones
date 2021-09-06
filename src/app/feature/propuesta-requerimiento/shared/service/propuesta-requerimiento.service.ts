import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { PropuestaRequerimiento } from '../model/propuesta-requerimiento';

@Injectable()
export class PropuestaRequerimientoService {

  constructor(protected http: HttpService) {}

  public consultar(idPropuesta: number) {
    return this.http.doGet<PropuestaRequerimiento[]>(
      `${environment.endpoint}/propuestas/${idPropuesta}/requerimientos`, this.http.optsName('Consultar Requerimientos de Propuesta')
    );
  }

  public guardar(licitacionRequerimiento: PropuestaRequerimiento) {
    return this.http.doPost<PropuestaRequerimiento, any>(
      `${environment.endpoint}/propuestas/${licitacionRequerimiento.propuestaId}/requerimientos/${licitacionRequerimiento.requerimientoId}`,
      licitacionRequerimiento,
      this.http.optsName('Guardar Requerimiento de Propuesta')
    );
  }

  public eliminar(idPropuesta: number, idRequerimiento: number) {
    return this.http.doDelete<any>(
      `${environment.endpoint}/propuestas/${idPropuesta}/requerimientos/${idRequerimiento}`,
      this.http.optsName('Eliminar Requerimiento de Propuesta'));
  }

}
