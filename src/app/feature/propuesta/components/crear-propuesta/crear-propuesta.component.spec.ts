import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { of, throwError } from 'rxjs';

import { CrearPropuestaComponent } from './crear-propuesta.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const VALOR_TEXTO_MENSAJE_OK = 'Propuesta registrada satisfactoriamente';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};

describe('CrearPropuestaComponent', () => {
  let component: CrearPropuestaComponent;
  let fixture: ComponentFixture<CrearPropuestaComponent>;
  let propuestaService: PropuestaService;

  const dummyPropuesta = new Propuesta(
    1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10,
    new Date('2021-09-01'), new Date('2021-09-15'), 1
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPropuestaComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        HttpService, PropuestaService,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1} } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPropuestaComponent);
    component = fixture.componentInstance;
    propuestaService = TestBed.inject(PropuestaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.propuestaForm.valid).toBeFalsy();
  });

  it('deberia registrar una propuesta', () => {
    spyOn(propuestaService, 'guardar').and.returnValue(of(true));
    expect(component.propuestaForm.valid).toBeFalsy();
    component.propuestaForm.controls.nombre.setValue(dummyPropuesta.nombre);
    component.propuestaForm.controls.descripcion.setValue(dummyPropuesta.descripcion);
    component.propuestaForm.controls.nombreCliente.setValue(dummyPropuesta.nombreCliente);
    component.propuestaForm.controls.valor.setValue(dummyPropuesta.valor);
    component.propuestaForm.controls.estado.setValue(dummyPropuesta.estado);
    expect(component.propuestaForm.valid).toBeTruthy();

    component.guardarPropuesta();

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_OK);
  });

  it('deberia retornar error al crear una licitacion', () => {
    spyOn(propuestaService, 'guardar').and.returnValue(throwError(THROW_ERROR));
    expect(component.propuestaForm.valid).toBeFalsy();
    component.propuestaForm.controls.nombre.setValue(dummyPropuesta.nombre);
    component.propuestaForm.controls.descripcion.setValue(dummyPropuesta.descripcion);
    component.propuestaForm.controls.nombreCliente.setValue(dummyPropuesta.nombreCliente);
    component.propuestaForm.controls.valor.setValue(dummyPropuesta.valor);
    component.propuestaForm.controls.estado.setValue(dummyPropuesta.estado);
    expect(component.propuestaForm.valid).toBeTruthy();

    component.guardarPropuesta();

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
