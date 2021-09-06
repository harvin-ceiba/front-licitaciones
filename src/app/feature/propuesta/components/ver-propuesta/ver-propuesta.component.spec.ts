import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { of } from 'rxjs';
import { PropuestaRequerimiento } from 'src/app/feature/propuesta-requerimiento/shared/model/propuesta-requerimiento';
import { PropuestaRequerimientoService } from 'src/app/feature/propuesta-requerimiento/shared/service/propuesta-requerimiento.service';

import { VerPropuestaComponent } from './ver-propuesta.component';

describe('VerPropuestaComponent', () => {
  let component: VerPropuestaComponent;
  let fixture: ComponentFixture<VerPropuestaComponent>;
  let route: ActivatedRoute; 
  let propuestaService: PropuestaService;
  let propuestaRequerimientoService: PropuestaRequerimientoService;

  const dummyRequerimientosPropuesta: PropuestaRequerimiento[] = [
    new PropuestaRequerimiento(1, 1, 1),
    new PropuestaRequerimiento(2, 1, 2),
    new PropuestaRequerimiento(3, 1, 3)  
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPropuestaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        PropuestaService, PropuestaRequerimientoService, HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1} },
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPropuestaComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    propuestaService = TestBed.inject(PropuestaService);
    propuestaRequerimientoService = TestBed.inject(PropuestaRequerimientoService);
    spyOn(propuestaRequerimientoService, 'consultar').and.returnValue(of(dummyRequerimientosPropuesta));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener la informacion de la propuesta', () => {
    // Arrange
    route.snapshot.params.id = '1';
    const dummyPropuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    spyOn(propuestaService, 'consultarPorId').and.returnValue(of(dummyPropuesta));
    // Act
    component.obtenerPropuesta(1);
    // Assert
    expect(dummyPropuesta.id).toBe(1);
  });

  it('deberia obtener el listado de requerimientos asociados a la propuesta', () => {
    route.snapshot.params.id = '1';
    component.listaRequerimientosPropuesta.subscribe(resultado => {
      expect(3).toBe(resultado.length);
    });
  });
});
