import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of, throwError } from 'rxjs';
import { Requerimiento } from 'src/app/feature/requerimiento/shared/model/requerimiento';
import { RequerimientoService } from 'src/app/feature/requerimiento/shared/service/requerimiento.service';
import { LicitacionRequerimiento } from '../../shared/model/licitacion-requerimiento';
import { LicitacionRequerimientoService } from '../../shared/service/licitacion-requerimiento.service';

import { LicitacionRequerimientoComponent } from './licitacion-requerimiento.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK = 'Requerimiento registrado satisfactoriamente';
const VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK = 'Requerimiento eliminado satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};

describe('LicitacionRequerimientoComponent', () => {
  let component: LicitacionRequerimientoComponent;
  let fixture: ComponentFixture<LicitacionRequerimientoComponent>;
  let requerimientoService: RequerimientoService;
  let licitacionRequerimientoService: LicitacionRequerimientoService;

  const dummyRequerimientos: Requerimiento[] = [
    new Requerimiento(1, 'REQUERIMIENTO 1', 1),
    new Requerimiento(2, 'REQUERIMIENTO 2', 1),
    new Requerimiento(3, 'REQUERIMIENTO 3', 1),
    new Requerimiento(4, 'REQUERIMIENTO 4', 1),
    new Requerimiento(5, 'REQUERIMIENTO 5', 1)
  ];

  const dummyRequerimientosLicitacion: LicitacionRequerimiento[] = [
    new LicitacionRequerimiento(1, 1, 1, 25),
    new LicitacionRequerimiento(2, 1, 2, 25),
    new LicitacionRequerimiento(3, 1, 3, 50)
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicitacionRequerimientoComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [RequerimientoService, LicitacionRequerimientoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacionRequerimientoComponent);
    component = fixture.componentInstance;
    requerimientoService = TestBed.inject(RequerimientoService);
    licitacionRequerimientoService = TestBed.inject(LicitacionRequerimientoService);
    spyOn(requerimientoService, 'consultar').and.returnValue(of(dummyRequerimientos));
    spyOn(licitacionRequerimientoService, 'consultar').and.returnValue(of(dummyRequerimientosLicitacion));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.requerimientosForm.valid).toBeFalsy();
  });

  it('deberia obtener todos los requerimientos del sistema', () => {
    component.listaRequerimientos.subscribe(resultado => {
      expect(5).toBe(resultado.length);
    });
  });

  it('deberia obtener los requerimientos asociados a la licitacion', () => {
    component.listaRequerimientosLicitacion.subscribe(resultado => {
      expect(3).toBe(resultado.length);
    });
  });

  it('deberia asociar un requerimiento a la licitacion', () => {
    // Arrange
    spyOn(licitacionRequerimientoService, 'guardar').and.returnValue(of(true));
    expect(component.requerimientosForm.valid).toBeFalsy();
    component.requerimientosForm.controls.licitacionId.setValue(1);
    component.requerimientosForm.controls.requerimientoId.setValue(4);
    component.requerimientosForm.controls.pesoPorcentual.setValue(25);
    expect(component.requerimientosForm.valid).toBeTruthy();
    // Act
    component.guardarRequerimiento();
    // Assert
    expect(component.showMessageFormReq).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.messageFormReq).toEqual(VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK);
  });

  it('deberia retorna un error al asociar un requerimiento a la licitacion', () => {
    // Arrange
    spyOn(licitacionRequerimientoService, 'guardar').and.returnValue(throwError(THROW_ERROR));
    expect(component.requerimientosForm.valid).toBeFalsy();
    component.requerimientosForm.controls.licitacionId.setValue(1);
    component.requerimientosForm.controls.requerimientoId.setValue(4);
    component.requerimientosForm.controls.pesoPorcentual.setValue(25);
    expect(component.requerimientosForm.valid).toBeTruthy();
    // Act
    component.guardarRequerimiento();
    // Assert
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

  it('deberia eliminar un requerimiento de la licitacion', () => {
    // Arrange
    spyOn(licitacionRequerimientoService, 'eliminar').and.returnValue(of(true));
    component.listaRequerimientosLicitacion = of(dummyRequerimientosLicitacion);
    // Act
    component.eliminarRequerimiento(1, 1);
    // Assert
    component.listaRequerimientosLicitacion.subscribe(resultado => {
      expect(resultado.length).toBe(2);
    });
    expect(component.showMessageFormReq).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.messageFormReq).toEqual(VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK);
  });

  it('deberia retornar un error al eliminar un requerimiento de la licitacion', () => {
    // Arrange
    spyOn(licitacionRequerimientoService, 'eliminar').and.returnValue(throwError(THROW_ERROR));
    // Act
    component.eliminarRequerimiento(1, 1);
    // Assert
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
