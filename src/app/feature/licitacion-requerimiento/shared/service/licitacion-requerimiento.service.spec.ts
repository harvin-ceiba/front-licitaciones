import { HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LicitacionRequerimiento } from '../model/licitacion-requerimiento';

import { LicitacionRequerimientoService } from './licitacion-requerimiento.service';

describe('LicitacionRequerimientoService', () => {
  let httpMock: HttpTestingController;
  let service: LicitacionRequerimientoService;
  const apiEndpointLicitaciones = `${environment.endpoint}/licitaciones`;


  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LicitacionRequerimientoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);

    service = TestBed.inject(LicitacionRequerimientoService);
  });

  it('should be created', () => {
    const licitacionRequerimientoService: LicitacionRequerimientoService = TestBed.inject(LicitacionRequerimientoService);
    expect(licitacionRequerimientoService).toBeTruthy();
  });

  it('deberia listar los requerimientos de una licitacion', () => {
    const dummyIdLicitacion = 1;
    const dummyRequerimientosLicitacion: LicitacionRequerimiento[] = [
      new LicitacionRequerimiento(1, 1, 1, 25),
      new LicitacionRequerimiento(2, 1, 2, 25),
      new LicitacionRequerimiento(3, 1, 3, 50)  
    ];

    service.consultar(dummyIdLicitacion).subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(dummyRequerimientosLicitacion);
    });

    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/requerimientos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRequerimientosLicitacion);
  });

  it('deberia asociar un requerimiento a una licitacion', () => {
    const dummyRequerimientoLicitacion = new LicitacionRequerimiento(1, 1, 1, 25);
    const dummyIdLicitacion = dummyRequerimientoLicitacion.licitacionId;
    const dummyIdRequerimiento = dummyRequerimientoLicitacion.requerimientoId;

    service.guardar(dummyRequerimientoLicitacion).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/requerimientos/${dummyIdRequerimiento}`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia editar un requerimiento de una licitacion', () => {
    const dummyRequerimientoLicitacion = new LicitacionRequerimiento(1, 1, 1, 25);
    const dummyIdLicitacion = dummyRequerimientoLicitacion.licitacionId;
    const dummyIdRequerimiento = dummyRequerimientoLicitacion.requerimientoId;

    service.editar(dummyRequerimientoLicitacion).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/requerimientos/${dummyIdRequerimiento}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar una licitacion', () => {
    const dummyIdLicitacion = 1;
    const dummyIdRequerimiento = 1;
    
    service.eliminar(dummyIdLicitacion, dummyIdRequerimiento).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/requerimientos/${dummyIdRequerimiento}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
