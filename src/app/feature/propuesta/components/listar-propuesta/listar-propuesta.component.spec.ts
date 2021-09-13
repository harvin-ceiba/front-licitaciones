import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { of, throwError } from 'rxjs';

import { ListarPropuestaComponent } from './listar-propuesta.component';

const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};

describe('ListarPropuestaComponent', () => {
  let component: ListarPropuestaComponent;
  let fixture: ComponentFixture<ListarPropuestaComponent>;
  let route: ActivatedRoute;
  let propuestaService: PropuestaService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPropuestaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [HttpService, PropuestaService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPropuestaComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    propuestaService = TestBed.inject(PropuestaService);
    spyOn(propuestaService, 'consultarTodos').and.returnValue(of(dummyPropuestas));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Metodo Listar', () => {

    it('deberia obtener las propuestas', () => {
      route.snapshot.params.id = '1';
      component.listaPropuestas$.subscribe(resultado => {
        expect(3).toBe(resultado.length);
      });
    });

  });

  describe('Metodo Eliminar ', () => {

    it('deberia eliminar la propuesta seleccionada', () => {
      // Arrange
      route.snapshot.params.id = '1';
      spyOn(propuestaService, 'eliminar').and.returnValue(of(true));
      component.listaPropuestas$ = of(dummyPropuestas);
      // Act
      component.eliminarPropuesta(1, 1);
      // Assert
      component.listaPropuestas$.subscribe(resultado => {
        expect(resultado.length).toBe(2);
      });
    });

    it('deberia obtener error al eliminar una licitacion', () => {
      // Arrange
      route.snapshot.params.id = '1';
      spyOn(propuestaService, 'eliminar').and.returnValue(throwError(THROW_ERROR));
      // Act
      component.eliminarPropuesta(1, 1);
      // Assert
      expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
    });

  });
});
