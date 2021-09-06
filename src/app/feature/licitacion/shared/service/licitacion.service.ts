import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Licitacion } from '../model/licitacion';

@Injectable()
export class LicitacionService {

  constructor(protected http: HttpService) {}

  public consultarTodos() {
    return this.http.doGet<Licitacion[]>(
      `${environment.endpoint}/licitaciones`, this.http.optsName('Consultar licitaciones')
    );
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Licitacion>(
      `${environment.endpoint}/licitaciones/${id}`, this.http.optsName('Consultar una licitación')
    );
  }

  public guardar(licitacion: Licitacion) {
    return this.http.doPost<Licitacion, any>(
      `${environment.endpoint}/licitaciones`, licitacion, this.http.optsName('Crear licitaciones')
    );
  }

  public editar(licitacion: Licitacion) {
    return this.http.doPut<Licitacion, any>(
      `${environment.endpoint}/licitaciones/${licitacion.id}`, licitacion, this.http.optsName('Actualizar licitaciones')
    );
  }

  public eliminar(id: number) {
    return this.http.doDelete<any>(
      `${environment.endpoint}/licitaciones/${id}`, this.http.optsName('Eliminar licitaciones'));
  }

  public publicar(id: number) {
    return this.http.doPut<Licitacion, boolean>(
      `${environment.endpoint}/licitaciones/${id}/publicar`, null, this.http.optsName('Publicar licitaciones')
    );
  }

}
