import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { of, throwError } from 'rxjs';
import { LicitacionRequerimientoComponent } from 'src/app/feature/licitacion-requerimiento/components/licitacion-requerimiento/licitacion-requerimiento.component';
import { LicitacionRequerimientoModule } from 'src/app/feature/licitacion-requerimiento/licitacion-requerimiento.module';
import { LicitacionRequerimientoService } from 'src/app/feature/licitacion-requerimiento/shared/service/licitacion-requerimiento.service';

import { EditarLicitacionComponent } from './editar-licitacion.component';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_LICITACION_OK = 'Licitacion actualizada satisfactoriamente';
const VALOR_TEXTO_MENSAJE_PUBLICACION_LICITACION_OK = 'Licitacion publicada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';
const THROW_ERROR = { error: { mensaje: 'Mensaje de error' }};


describe('EditarLicitacionComponent', () => {
  let component: EditarLicitacionComponent;
  let fixture: ComponentFixture<EditarLicitacionComponent>;
  let route: ActivatedRoute; 
  let licitacionService: LicitacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLicitacionComponent, LicitacionRequerimientoComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LicitacionRequerimientoModule
      ],
      providers: [
        LicitacionService, LicitacionRequerimientoService, HttpService,
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
    fixture = TestBed.createComponent(EditarLicitacionComponent);
    route = TestBed.inject(ActivatedRoute);
    licitacionService = TestBed.inject(LicitacionService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.licitacionForm.valid).toBeFalsy();
  });

  it('deberia consultar una licitacion', () => {
    route.snapshot.params.id = '1';
    const dummyLicitacion = new Licitacion(
      1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
      1000, new Date('2021-08-01'), new Date('2021-08-31'), 0
    );
    spyOn(licitacionService, 'consultarPorId').and.returnValue(of(dummyLicitacion));

    component.obtenerLicitacion(1);

    expect(dummyLicitacion.id).toBe(1);
  });

  it('deberia editar una licitacion', () => {
    route.snapshot.params.id = '1';
    spyOn(licitacionService, 'editar').and.returnValue(of(true));
    expect(component.licitacionForm.valid).toBeFalsy();

    const licitacion = new Licitacion(
      1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
      1000, new Date('2021-08-01'), new Date('2021-08-31'), 0
    );

    component.currentLicitacionId = licitacion.id;
    component.licitacionForm.controls.id.setValue(licitacion.id);
    component.licitacionForm.controls.codigo.setValue(licitacion.codigo);
    component.licitacionForm.controls.nombre.setValue(licitacion.nombre);
    component.licitacionForm.controls.descripcion.setValue(licitacion.descripcion);
    component.licitacionForm.controls.fechaInicio.setValue(licitacion.fechaInicio);
    component.licitacionForm.controls.fechaFin.setValue(licitacion.fechaFin);
    component.licitacionForm.controls.presupuesto.setValue(licitacion.presupuesto);
    component.licitacionForm.controls.estado.setValue(licitacion.estado);
    expect(component.licitacionForm.valid).toBeTruthy();
    component.editarLicitacion();

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_LICITACION_OK);
  });

  it('deberia retornar error al editar una licitacion', () => {
    route.snapshot.params.id = '1';
    spyOn(licitacionService, 'editar').and.returnValue(throwError(THROW_ERROR));
    expect(component.licitacionForm.valid).toBeFalsy();

    const licitacion = new Licitacion(
      1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1',
      1000, new Date('2021-08-01'), new Date('2021-08-31'), 0
    );

    component.currentLicitacionId = licitacion.id;
    component.licitacionForm.controls.id.setValue(licitacion.id);
    component.licitacionForm.controls.codigo.setValue(licitacion.codigo);
    component.licitacionForm.controls.nombre.setValue(licitacion.nombre);
    component.licitacionForm.controls.descripcion.setValue(licitacion.descripcion);
    component.licitacionForm.controls.fechaInicio.setValue(licitacion.fechaInicio);
    component.licitacionForm.controls.fechaFin.setValue(licitacion.fechaFin);
    component.licitacionForm.controls.presupuesto.setValue(licitacion.presupuesto);
    component.licitacionForm.controls.estado.setValue(licitacion.estado);
    expect(component.licitacionForm.valid).toBeTruthy();

    component.editarLicitacion();

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

  it('deberia publicar una licitacion', () => {
    spyOn(licitacionService, 'publicar').and.returnValue(of(true));

    component.publicarLicitacion(1);

    expect(component.showMessage).toEqual(VALOR_MOSTRAR_MENSAJE);
    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_OK);
    expect(component.message).toEqual(VALOR_TEXTO_MENSAJE_PUBLICACION_LICITACION_OK);
  });

  it('deberia retornar error al publicar una licitacion', () => {
    spyOn(licitacionService, 'publicar').and.returnValue(throwError(THROW_ERROR));

    component.publicarLicitacion(1);

    expect(component.typeMessage).toEqual(VALOR_TIPO_MENSAJE_ERROR);
  });

});
