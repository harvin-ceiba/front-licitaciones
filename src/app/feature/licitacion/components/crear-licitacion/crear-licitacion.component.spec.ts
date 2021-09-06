import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { of, throwError } from 'rxjs';

import { CrearLicitacionComponent } from './crear-licitacion.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const VALOR_TEXTO_MENSAJE_OK = 'Licitacion registrada satisfactoriamente';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};

describe('CrearLicitacionComponent', () => {
  let component: CrearLicitacionComponent;
  let fixture: ComponentFixture<CrearLicitacionComponent>;
  let licitacionService: LicitacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLicitacionComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [LicitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLicitacionComponent);
    component = fixture.componentInstance;
    licitacionService = TestBed.inject(LicitacionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.licitacionForm.valid).toBeFalsy();
  });

  it('deberia registrar licitacion', () => {
    spyOn(licitacionService, 'guardar').and.returnValue(of(true));
    expect(component.licitacionForm.valid).toBeFalsy();

    const licitacion = new Licitacion(
      1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
      1000, new Date('2021-09-01'), new Date('2021-09-30'), 0
    );

    component.licitacionForm.controls.codigo.setValue(licitacion.codigo);
    component.licitacionForm.controls.nombre.setValue(licitacion.nombre);
    component.licitacionForm.controls.descripcion.setValue(licitacion.descripcion);
    component.licitacionForm.controls.fechaInicio.setValue(licitacion.fechaInicio);
    component.licitacionForm.controls.fechaFin.setValue(licitacion.fechaFin);
    component.licitacionForm.controls.presupuesto.setValue(licitacion.presupuesto);
    component.licitacionForm.controls.estado.setValue(licitacion.estado);
    expect(component.licitacionForm.valid).toBeTruthy();
    component.guardarLicitacion();

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_OK);
  });

  it('deberia retornar error al crear licitacion', () => {
    spyOn(licitacionService, 'guardar').and.returnValue(throwError(THROW_ERROR));
    expect(component.licitacionForm.valid).toBeFalsy();

    const licitacion = new Licitacion(
      1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
      1000, new Date('2021-09-01'), new Date('2021-09-30'), 0
    );

    component.licitacionForm.controls.codigo.setValue(licitacion.codigo);
    component.licitacionForm.controls.nombre.setValue(licitacion.nombre);
    component.licitacionForm.controls.descripcion.setValue(licitacion.descripcion);
    component.licitacionForm.controls.fechaInicio.setValue(licitacion.fechaInicio);
    component.licitacionForm.controls.fechaFin.setValue(licitacion.fechaFin);
    component.licitacionForm.controls.presupuesto.setValue(licitacion.presupuesto);
    component.licitacionForm.controls.estado.setValue(licitacion.estado);
    expect(component.licitacionForm.valid).toBeTruthy();
    component.guardarLicitacion();

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
