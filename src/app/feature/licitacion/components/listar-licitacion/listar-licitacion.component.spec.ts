import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListarLicitacionComponent } from './listar-licitacion.component';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { of, throwError } from 'rxjs';

const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};


describe('ListarLicitacionComponent', () => {
  let component: ListarLicitacionComponent;
  let fixture: ComponentFixture<ListarLicitacionComponent>;
  let licitacionService: LicitacionService;

  const dummyLicitaciones: Licitacion[] = [
    new Licitacion(1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1', 1000, new Date('2021-08-01'), new Date('2021-08-31'), 0),
    new Licitacion(2, 'CODIGO2', 'TITULO_LICITACION2', 'DESCRIPCION2', 2000, new Date('2021-09-01'), new Date('2021-09-30'), 0)
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLicitacionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [LicitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLicitacionComponent);
    component = fixture.componentInstance;
    licitacionService = TestBed.inject(LicitacionService);
    spyOn(licitacionService, 'consultarTodos').and.returnValue(of(dummyLicitaciones));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Metodo Listar', () => {

    it('deberia obtener las licitaciones', () => {
      component.listaLicitaciones$.subscribe(resultado => {
        expect(2).toBe(resultado.length);
      });
    });

  });

  describe('Metodo Eliminar ', () => {

    it('deberia eliminar la licitacion seleccionada', () => {
      // Arrange
      spyOn(licitacionService, 'eliminar').and.returnValue(of(true));
      component.listaLicitaciones$ = of(dummyLicitaciones);
      // Act
      component.eliminarLicitacion(1);
      // Assert
      component.listaLicitaciones$.subscribe(resultado => {
        expect(resultado.length).toBe(1);
      });
    });

    it('deberia obtener error al eliminar una licitacion', () => {
      // Arrange
      spyOn(licitacionService, 'eliminar').and.returnValue(throwError(THROW_ERROR));
      // Act
      component.eliminarLicitacion(1);
      // Assert
      expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
    });

  });

});
