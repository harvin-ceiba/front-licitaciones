import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Licitacion } from '../model/licitacion';

@Injectable()
export class LicitacionService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Licitacion[]>(
      `${environment.endpoint}/licitaciones`, this.http.optsName('Consultar licitaciones')
    );
  }

  public guardar(licitacion: Licitacion) {
    return this.http.doPost<Licitacion, any>(
      `${environment.endpoint}/licitaciones`, licitacion, this.http.optsName('Crear/Actualizar licitaciones')
    );
  }

  public publicar(licitacion: Licitacion) {
    return this.http.doPost<Licitacion, any>(
      `${environment.endpoint}/licitaciones`, licitacion, this.http.optsName('Publicar licitaciones')
    );
  }

  public eliminar(licitacion: Licitacion) {
    return this.http.doDelete<any>(
      `${environment.endpoint}/licitaciones/${licitacion.id}`, this.http.optsName('Eliminar licitaciones'));
  }

}
