import { HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { PropuestaRequerimiento } from '../model/propuesta-requerimiento';

import { PropuestaRequerimientoService } from './propuesta-requerimiento.service';

describe('PropuestaRequerimientoService', () => {
  let httpMock: HttpTestingController;
  let service: PropuestaRequerimientoService;
  const apiEndpointPropuestas = `${environment.endpoint}/propuestas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PropuestaRequerimientoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PropuestaRequerimientoService);
  });

  it('should be created', () => {
    const propuestaRequerimientoService: PropuestaRequerimientoService = TestBed.inject(PropuestaRequerimientoService);
    expect(propuestaRequerimientoService).toBeTruthy();
  });

  it('deberia listar los requerimientos de una propuesta', () => {
    const dummyIdPropuesta = 1;
    const dummyRequerimientosPropuesta: PropuestaRequerimiento[] = [
      new PropuestaRequerimiento(1, 1, 1),
      new PropuestaRequerimiento(2, 2, 1),
      new PropuestaRequerimiento(3, 3, 1)
    ];

    service.consultar(dummyIdPropuesta).subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(dummyRequerimientosPropuesta);
    });

    const req = httpMock.expectOne(`${apiEndpointPropuestas}/${dummyIdPropuesta}/requerimientos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRequerimientosPropuesta);
  });

  it('deberia asociar un requerimiento a una licitacion', () => {
    const dummyRequerimientoLicitacion = new PropuestaRequerimiento(1, 1, 1);
    const dummyIdPropuesta = dummyRequerimientoLicitacion.propuestaId;
    const dummyIdRequerimiento = dummyRequerimientoLicitacion.requerimientoId;

    service.guardar(dummyRequerimientoLicitacion).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointPropuestas}/${dummyIdPropuesta}/requerimientos/${dummyIdRequerimiento}`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar una licitacion', () => {
    const dummyIdPropuesta = 1;
    const dummyIdRequerimiento = 1;

    service.eliminar(dummyIdPropuesta, dummyIdRequerimiento).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointPropuestas}/${dummyIdPropuesta}/requerimientos/${dummyIdRequerimiento}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
