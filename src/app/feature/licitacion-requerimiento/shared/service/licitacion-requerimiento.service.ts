import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LicitacionRequerimiento } from '../model/licitacion-requerimiento';

@Injectable()
export class LicitacionRequerimientoService {

  constructor(protected http: HttpService) {}

  public consultar(idLicitacion: number) {
    return this.http.doGet<LicitacionRequerimiento[]>(
      `${environment.endpoint}/licitaciones/${idLicitacion}/requerimientos`, this.http.optsName('Consultar Requerimientos de Licitacion')
    );
  }

  public guardar(licitacionRequerimiento: LicitacionRequerimiento) {
    return this.http.doPost<LicitacionRequerimiento, any>(
      `${environment.endpoint}/licitaciones/${licitacionRequerimiento.licitacionId}/requerimientos/${licitacionRequerimiento.requerimientoId}`,
      licitacionRequerimiento,
      this.http.optsName('Guardar Requerimiento de Licitacion')
    );
  }

  public editar(licitacionRequerimiento: LicitacionRequerimiento) {
    return this.http.doPut<LicitacionRequerimiento, any>(
      `${environment.endpoint}/licitaciones/${licitacionRequerimiento.licitacionId}/requerimientos/${licitacionRequerimiento.requerimientoId}`,
      licitacionRequerimiento,
      this.http.optsName('Editar Requerimiento de Licitacion')
    );
  }

  public eliminar(idLicitacion: number, idRequerimiento: number) {
    return this.http.doDelete<any>(
      `${environment.endpoint}/licitaciones/${idLicitacion}/requerimientos/${idRequerimiento}`,
      this.http.optsName('Eliminar Requerimiento de Licitacion'));
  }

}
