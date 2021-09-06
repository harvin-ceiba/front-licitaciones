import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Propuesta } from '../model/propuesta';

@Injectable()
export class PropuestaService {

  constructor(protected http: HttpService) {}

  public consultarTodos() {
    return this.http.doGet<Propuesta[]>(
      `${environment.endpoint}/propuestas`, this.http.optsName('Consultar propuestas')
    );
  }

  public consultarPorIdLicitacion(idLicitacion: number) {
    return this.http.doGet<Propuesta[]>(
      `${environment.endpoint}/licitaciones/${idLicitacion}/propuestas`, this.http.optsName('Consultar propuestas')
    );
  }

  public consultarPorId(idPropuesta: number) {
    return this.http.doGet<Propuesta>(
      `${environment.endpoint}/propuestas/${idPropuesta}`, this.http.optsName('Consultar una propuesta')
    );
  }

  public guardar(idLicitacion: number, propuesta: Propuesta) {
    return this.http.doPost<Propuesta, any>(
      `${environment.endpoint}/licitaciones/${idLicitacion}/propuestas`, propuesta, this.http.optsName('Crear propuestas')
    );
  }

  public editar(propuesta: Propuesta) {
    return this.http.doPut<Propuesta, any>(
      `${environment.endpoint}/licitaciones/${propuesta.licitacionId}/propuestas/${propuesta.id}`, propuesta, this.http.optsName('Actualizar propuestas')
    );
  }

  public eliminar(idLicitacion: number, idPropuesta: number) {
    return this.http.doDelete<any>(
      `${environment.endpoint}/licitaciones/${idLicitacion}/propuestas/${idPropuesta}`, this.http.optsName('Eliminar propuestas'));
  }

  public publicar(idPropuesta: number) {
    return this.http.doPut<Propuesta, any>(
      `${environment.endpoint}/propuestas/${idPropuesta}/publicar`, null, this.http.optsName('Publicar propuestas')
    );
  }

}
