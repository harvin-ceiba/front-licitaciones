import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { LicitacionService } from './licitacion.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '../model/licitacion';
import { HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LicitacionService', () => {
  let httpMock: HttpTestingController;
  let service: LicitacionService;
  const apiEndpointLicitaciones = `${environment.endpoint}/licitaciones`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LicitacionService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LicitacionService);
  });

  it('should be created', () => {
    const licitacionService: LicitacionService = TestBed.inject(LicitacionService);
    expect(licitacionService).toBeTruthy();
  });

  it('deberia listar licitaciones', () => {
    const dummyLicitaciones: Licitacion[] = [
      new Licitacion(1, 'CODIGO1', 'NOMBRE1', 'DESCRIPCION1', 1000,
      new Date('2021-08-01'), new Date('2021-08-31'), 0),
      new Licitacion(2, 'CODIGO2', 'NOMBRE2', 'DESCRIPCION2', 2000,
      new Date('2021-09-01'), new Date('2021-09-30'), 0)
    ];
    service.consultarTodos().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyLicitaciones);
    });
    const req = httpMock.expectOne(apiEndpointLicitaciones);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLicitaciones);
  });

  it('deberia consultar una licitacion', () => {
    const dummyId = 1;
    const dummyLicitacion = new Licitacion(
      1, 'CODIGO1', 'NOMBRE1', 'DESCRIPCION1', 1000,
      new Date('2021-08-01'), new Date('2021-08-31'), 0
    );
    service.consultarPorId(dummyId).subscribe(res => {
      expect(res).toEqual(dummyLicitacion);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLicitacion);
  });

  it('deberia crear una licitacion', () => {
    const dummyLicitacion = new Licitacion(
      1, 'CODIGO1', 'NOMBRE1', 'DESCRIPCION1', 1000,
      new Date('2021-08-01'), new Date('2021-08-31'), 0
    );
    service.guardar(dummyLicitacion).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointLicitaciones);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia editar una licitacion', () => {
    const dummyId = 1;
    const dummyLicitacion = new Licitacion(1, 'CODIGO1', 'NOMBRE1', 'DESCRIPCION1', 1000,
    new Date('2021-08-01'), new Date('2021-08-31'), 0);
    service.editar(dummyLicitacion).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyId}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar una licitacion', () => {
    const dummyId = 1;
    service.eliminar(dummyId).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyId}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia publicar una licitacion', () => {
    const dummyId = 1;
    service.publicar(dummyId).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyId}/publicar`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
