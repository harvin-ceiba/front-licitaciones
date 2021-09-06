import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { of } from 'rxjs';
import { LicitacionRequerimientoModule } from 'src/app/feature/licitacion-requerimiento/licitacion-requerimiento.module';
import { LicitacionRequerimiento } from 'src/app/feature/licitacion-requerimiento/shared/model/licitacion-requerimiento';
import { LicitacionRequerimientoService } from 'src/app/feature/licitacion-requerimiento/shared/service/licitacion-requerimiento.service';

import { VerLicitacionComponent } from './ver-licitacion.component';

describe('VerLicitacionComponent', () => {
  let component: VerLicitacionComponent;
  let fixture: ComponentFixture<VerLicitacionComponent>;
  let route: ActivatedRoute; 
  let licitacionService: LicitacionService;
  let propuestaService: PropuestaService;
  let licitacionRequerimientoService: LicitacionRequerimientoService;

  const dummyLicitacion = new Licitacion(
    1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
    1000, new Date('2021-08-01'), new Date('2021-08-31'), 0
  );

  const dummyRequerimientosLicitacion: LicitacionRequerimiento[] = [
    new LicitacionRequerimiento(1, 1, 1, 25),
    new LicitacionRequerimiento(2, 1, 2, 25),
    new LicitacionRequerimiento(3, 1, 3, 50)
  ];

  const dummyPropuestas: Propuesta[] = [
    new Propuesta(1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    ),
    new Propuesta(2, 1, 'PROPUESTA 2', 'DESCRIPCION2', 'NOMBRE CLIENTE 2', 2000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    ),
    new Propuesta(3, 1, 'PROPUESTA 3', 'DESCRIPCION3', 'NOMBRE CLIENTE 3', 2000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 0
    )
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerLicitacionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        LicitacionRequerimientoModule
      ],
      providers: [
        LicitacionService, PropuestaService, LicitacionRequerimientoService, HttpService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1} } }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLicitacionComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    licitacionService = TestBed.inject(LicitacionService);
    propuestaService = TestBed.inject(PropuestaService);
    licitacionRequerimientoService = TestBed.inject(LicitacionRequerimientoService);
    spyOn(licitacionRequerimientoService, 'consultar').and.returnValue(of(dummyRequerimientosLicitacion));
    spyOn(propuestaService, 'consultarPorIdLicitacion').and.returnValue(of(dummyPropuestas));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener la informacion de la licitacion', () => {
    // Arrange
    route.snapshot.params.id = '1';
    spyOn(licitacionService, 'consultarPorId').and.returnValue(of(dummyLicitacion));
    // Act
    component.obtenerLicitacion();
    // Assert
    expect(component.currentLicitacion.id).toBe(1);
  });

  it('deberia obtener el listado de requerimientos asociados a la licitacion', () => {
    component.listaRequerimientosLicitacion.subscribe(resultado => {
      expect(3).toBe(resultado.length);
    });
  });

  it('deberia obtener el listado de propuestas publicadas asociadas a la licitacion', () => {
    component.listaPropuestas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

});
