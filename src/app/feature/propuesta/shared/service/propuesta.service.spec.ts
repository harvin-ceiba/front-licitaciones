import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Propuesta } from '../model/propuesta';

import { PropuestaService } from './propuesta.service';

describe('PropuestaService', () => {
  let httpMock: HttpTestingController;
  let service: PropuestaService;
  const apiEndpointLicitaciones = `${environment.endpoint}/licitaciones`;
  const apiEndpointPropuestas = `${environment.endpoint}/propuestas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PropuestaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PropuestaService);
  });

  it('should be created', () => {
    const propuestaService: PropuestaService = TestBed.inject(PropuestaService);
    expect(propuestaService).toBeTruthy();
  });

  it('deberia todas las propuestas', () => {
    const dummyPropuestas: Propuesta[] = [
      new Propuesta(
        1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
        new Date('2021-09-01'), new Date('2021-09-15'), 1
      ),
      new Propuesta(
        2, 1, 'PROPUESTA 2', 'DESCRIPCION2', 'NOMBRE CLIENTE 2', 2000, 10,
        new Date('2021-09-01'), new Date('2021-09-15'), 1
      ),
      new Propuesta(
        3, 2, 'PROPUESTA 3', 'DESCRIPCION3', 'NOMBRE CLIENTE 3', 2000, 10,
        new Date('2021-09-01'), new Date('2021-09-15'), 1
      )
    ];
    service.consultarTodos().subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(dummyPropuestas);
    });
    const req = httpMock.expectOne(apiEndpointPropuestas);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPropuestas);
  });

  it('deberia listar todas propuestas de una licitacion', () => {
    const dummyIdLicitacion = 1;
    const dummyPropuestas: Propuesta[] = [
      new Propuesta(
        1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
        new Date('2021-09-01'), new Date('2021-09-15'), 1
      ),
      new Propuesta(
        2, 1, 'PROPUESTA 2', 'DESCRIPCION2', 'NOMBRE CLIENTE 2', 2000, 10,
        new Date('2021-09-01'), new Date('2021-09-15'), 1
      )
    ];
    service.consultarPorIdLicitacion(dummyIdLicitacion).subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyPropuestas);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/propuestas`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPropuestas);
  });

  it('deberia una propuesta por id', () => {
    const dummyIdPropuesta = 1;
    const dummyPropuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    service.consultarPorId(dummyIdPropuesta).subscribe(res => {
      expect(res).toEqual(dummyPropuesta);
    });
    const req = httpMock.expectOne(`${apiEndpointPropuestas}/${dummyIdPropuesta}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPropuesta);
  });

  it('deberia crear una licitacion', () => {
    const dummyIdLicitacion = 1;
    const dummyPropuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    service.guardar(dummyIdLicitacion, dummyPropuesta).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/propuestas`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia editar una licitacion', () => {
    const dummyPropuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    service.editar(dummyPropuesta).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyPropuesta.licitacionId}/propuestas/${dummyPropuesta.id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar una licitacion', () => {
    const dummyIdLicitacion = 1;
    const dummyIdPropuesta = 1;
    service.eliminar(dummyIdLicitacion, dummyIdPropuesta).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLicitaciones}/${dummyIdLicitacion}/propuestas/${dummyIdPropuesta}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia publicar una licitacion', () => {
    const dummyIdPropuesta = 1;
    service.publicar(dummyIdPropuesta).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointPropuestas}/${dummyIdPropuesta}/publicar`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
