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
import { PropuestaRequerimientoComponent } from 'src/app/feature/propuesta-requerimiento/components/propuesta-requerimiento/propuesta-requerimiento.component';
import { PropuestaRequerimientoModule } from 'src/app/feature/propuesta-requerimiento/propuesta-requerimiento.module';

import { EditarPropuestaComponent } from './editar-propuesta.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_OK = 'Propuesta actualizada satisfactoriamente';
const VALOR_TEXTO_MENSAJE_PUBLICACION_PROPUESTA_OK = 'Propuesta publicada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: "Mensaje de error" }};

describe('EditarPropuestaComponent', () => {
  let component: EditarPropuestaComponent;
  let fixture: ComponentFixture<EditarPropuestaComponent>;
  let route: ActivatedRoute; 
  let propuestaService: PropuestaService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPropuestaComponent, PropuestaRequerimientoComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        PropuestaRequerimientoModule
      ],
      providers: [
        PropuestaService, HttpService,
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
    fixture = TestBed.createComponent(EditarPropuestaComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    propuestaService = TestBed.inject(PropuestaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia consultar una propuesta', () => {
    route.snapshot.params.id = '1';
    const dummyPropuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    spyOn(propuestaService, 'consultarPorId').and.returnValue(of(dummyPropuesta));

    component.obtenerPropuesta(1);

    expect(dummyPropuesta.id).toBe(1);
  });

  it('deberia editar una propuesta', () => {
    spyOn(propuestaService, 'editar').and.returnValue(of(true));
    expect(component.propuestaForm.valid).toBeFalsy();
    const propuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    component.propuestaForm.controls.nombre.setValue(propuesta.nombre);
    component.propuestaForm.controls.descripcion.setValue(propuesta.descripcion);
    component.propuestaForm.controls.nombreCliente.setValue(propuesta.nombreCliente);
    component.propuestaForm.controls.valor.setValue(propuesta.valor);
    component.propuestaForm.controls.estado.setValue(propuesta.estado);
    expect(component.propuestaForm.valid).toBeTruthy();

    component.editarPropuesta();

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_OK);
  });

  it('deberia retornar error al editar una propuesta', () => {
    spyOn(propuestaService, 'editar').and.returnValue(throwError(THROW_ERROR));
    expect(component.propuestaForm.valid).toBeFalsy();
    const propuesta = new Propuesta(
      1, 1, 'PROPUESTA 1', 'DESCRIPCION1', 'NOMBRE CLIENTE 1', 1000, 10, 
      new Date('2021-09-01'), new Date('2021-09-15'), 1
    );
    component.propuestaForm.controls.nombre.setValue(propuesta.nombre);
    component.propuestaForm.controls.descripcion.setValue(propuesta.descripcion);
    component.propuestaForm.controls.nombreCliente.setValue(propuesta.nombreCliente);
    component.propuestaForm.controls.valor.setValue(propuesta.valor);
    component.propuestaForm.controls.estado.setValue(propuesta.estado);
    expect(component.propuestaForm.valid).toBeTruthy();

    component.editarPropuesta();

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

  it('deberia publicar una propuesta', () => {
    spyOn(propuestaService, 'publicar').and.returnValue(of(true));

    component.publicarPropuesta(1);

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_PUBLICACION_PROPUESTA_OK);
  });

  it('deberia retornar error al publicar una licitacion', () => {
    spyOn(propuestaService, 'publicar').and.returnValue(throwError(THROW_ERROR));

    component.publicarPropuesta(1);

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
