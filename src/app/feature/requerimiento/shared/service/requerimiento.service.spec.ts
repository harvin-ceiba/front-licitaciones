import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Requerimiento } from '../model/requerimiento';

import { RequerimientoService } from './requerimiento.service';

describe('RequerimientoService', () => {
  let httpMock: HttpTestingController;
  let service: RequerimientoService;
  const apiEndpointRequerimientos = `${environment.endpoint}/requerimientos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RequerimientoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(RequerimientoService);
  });

  it('should be created', () => {
    const requerimientoService: RequerimientoService = TestBed.inject(RequerimientoService);
    expect(requerimientoService).toBeTruthy();
  });

  it('deberia listar requerimientos', () => {
    const dummyRequerimientos: Requerimiento[] = [
      new Requerimiento(1, 'REQUERIMIENTO 1', 1),
      new Requerimiento(2, 'REQUERIMIENTO 2', 1)
    ];
    service.consultar().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyRequerimientos);
    });
    const req = httpMock.expectOne(apiEndpointRequerimientos);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRequerimientos);
  });
});
