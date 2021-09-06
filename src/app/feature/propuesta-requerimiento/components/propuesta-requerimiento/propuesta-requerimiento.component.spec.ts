import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of, throwError } from 'rxjs';
import { Requerimiento } from 'src/app/feature/requerimiento/shared/model/requerimiento';
import { RequerimientoService } from 'src/app/feature/requerimiento/shared/service/requerimiento.service';
import { PropuestaRequerimiento } from '../../shared/model/propuesta-requerimiento';
import { PropuestaRequerimientoService } from '../../shared/service/propuesta-requerimiento.service';

import { PropuestaRequerimientoComponent } from './propuesta-requerimiento.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK = 'Requerimiento registrado satisfactoriamente';
const VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK = 'Requerimiento eliminado satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};

describe('PropuestaRequerimientoComponent', () => {
  let component: PropuestaRequerimientoComponent;
  let fixture: ComponentFixture<PropuestaRequerimientoComponent>;
  let requerimientoService: RequerimientoService;
  let propuestaRequerimientoService: PropuestaRequerimientoService;

  const dummyRequerimientos: Requerimiento[] = [
    new Requerimiento(1, 'REQUERIMIENTO 1', 1),
    new Requerimiento(2, 'REQUERIMIENTO 2', 1),
    new Requerimiento(3, 'REQUERIMIENTO 3', 1),
    new Requerimiento(4, 'REQUERIMIENTO 4', 1),
    new Requerimiento(5, 'REQUERIMIENTO 5', 1)
  ];

  const dummyRequerimientosPropuesta: PropuestaRequerimiento[] = [
    new PropuestaRequerimiento(1, 1, 1),
    new PropuestaRequerimiento(2, 1, 2),
    new PropuestaRequerimiento(3, 1, 3)
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropuestaRequerimientoComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [RequerimientoService, PropuestaRequerimientoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropuestaRequerimientoComponent);
    component = fixture.componentInstance;
    requerimientoService = TestBed.inject(RequerimientoService);
    propuestaRequerimientoService = TestBed.inject(PropuestaRequerimientoService);
    spyOn(requerimientoService, 'consultar').and.returnValue(of(dummyRequerimientos));
    spyOn(propuestaRequerimientoService, 'consultar').and.returnValue(of(dummyRequerimientosPropuesta));
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

  it('deberia obtener los requerimientos asociados a la propuesta', () => {
    component.listaRequerimientosPropuesta.subscribe(resultado => {
      expect(3).toBe(resultado.length);
    });
  });

  it('deberia asociar un requerimiento a la propuesta', () => {
    // Arrange
    spyOn(propuestaRequerimientoService, 'guardar').and.returnValue(of(true));
    expect(component.requerimientosForm.valid).toBeFalsy();
    component.requerimientosForm.controls.propuestaId.setValue(1);
    component.requerimientosForm.controls.requerimientoId.setValue(4);
    expect(component.requerimientosForm.valid).toBeTruthy();
    // Act
    component.guardarRequerimiento();
    // Assert
    expect(component.showMessageFormReq).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.messageFormReq).toEqual(VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK);
  });

  it('deberia retorna un error al asociar un requerimiento a la propuesta', () => {
    // Arrange
    spyOn(propuestaRequerimientoService, 'guardar').and.returnValue(throwError(THROW_ERROR));
    expect(component.requerimientosForm.valid).toBeFalsy();
    component.requerimientosForm.controls.propuestaId.setValue(1);
    component.requerimientosForm.controls.requerimientoId.setValue(4);
    expect(component.requerimientosForm.valid).toBeTruthy();
    // Act
    component.guardarRequerimiento();
    // Assert
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

  it('deberia eliminar un requerimiento de la propuesta', () => {
    // Arrange
    spyOn(propuestaRequerimientoService, 'eliminar').and.returnValue(of(true));
    component.listaRequerimientosPropuesta = of(dummyRequerimientosPropuesta);
    // Act
    component.eliminarRequerimiento(1, 1);
    // Assert
    component.listaRequerimientosPropuesta.subscribe(resultado => {
      expect(resultado.length).toBe(2);
    });
    expect(component.showMessageFormReq).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.messageFormReq).toEqual(VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK);
  });

  it('deberia retornar un error al eliminar un requerimiento de la propuesta', () => {
    // Arrange
    spyOn(propuestaRequerimientoService, 'eliminar').and.returnValue(throwError(THROW_ERROR));
    // Act
    component.eliminarRequerimiento(1, 1);
    // Assert
    expect(component.typeMessageFormReq).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
