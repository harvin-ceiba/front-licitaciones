import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Requerimiento } from '../model/requerimiento';

@Injectable()
export class RequerimientoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Requerimiento[]>(
      `${environment.endpoint}/requerimientos`, this.http.optsName('Consultar Requerimientos')
    );
  }
}
