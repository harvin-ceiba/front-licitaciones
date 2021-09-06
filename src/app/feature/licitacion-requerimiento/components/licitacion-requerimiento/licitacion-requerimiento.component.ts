import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requerimiento } from 'src/app/feature/requerimiento/shared/model/requerimiento';
import { RequerimientoService } from 'src/app/feature/requerimiento/shared/service/requerimiento.service';
import { LicitacionRequerimiento } from '../../shared/model/licitacion-requerimiento';
import { LicitacionRequerimientoService } from '../../shared/service/licitacion-requerimiento.service';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK = 'Requerimiento registrado satisfactoriamente';
const VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK = 'Requerimiento eliminado satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

@Component({
  selector: 'app-licitacion-requerimiento',
  templateUrl: './licitacion-requerimiento.component.html',
  styleUrls: ['./licitacion-requerimiento.component.css']
})
export class LicitacionRequerimientoComponent implements OnInit {

  @Input() licitacionId: number;
  listaRequerimientos: Observable<Requerimiento[]>;
  listaRequerimientosLicitacion: Observable<LicitacionRequerimiento[]>;
  requerimientosForm: FormGroup;
  showMessageFormReq = false;
  typeMessageFormReq: string;
  messageFormReq: string;


  constructor(
    private formBuilder: FormBuilder,
    protected requerimientoService: RequerimientoService,
    protected licitacionRequerimientoService: LicitacionRequerimientoService
  ) { }

  ngOnInit(): void {
    this.construirFormularioRequerimientos();
    this.obtenerListaRequerimientos();
    this.obtenerRequerimientosLicitacion(this.licitacionId);
  }

  construirFormularioRequerimientos(): void {
    this.showMessageFormReq = VALOR_NO_MOSTRAR_MENSAJE;
    this.requerimientosForm = this.formBuilder.group({
      licitacionId: [this.licitacionId],
      requerimientoId: [null, [Validators.required]],
      pesoPorcentual: [null, [Validators.required]]
    });
  }

  obtenerListaRequerimientos(): void {
    of(this.requerimientoService.consultar()).subscribe(data => {
      this.listaRequerimientos = data;
    });
  }

  obtenerRequerimientosLicitacion(id: number): void {
    of(this.licitacionRequerimientoService.consultar(id)).subscribe(data => {
      this.listaRequerimientosLicitacion = data;
    });
  }

  guardarRequerimiento(): void {
    this.licitacionRequerimientoService.guardar(this.requerimientosForm.value).subscribe(
      () => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_OK;
        this.messageFormReq = VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK;
      },
      error => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_ERROR;
        this.messageFormReq = error;
      }
    );
    this.obtenerRequerimientosLicitacion(this.licitacionId);
  }

  eliminarRequerimiento(idLicitacion: number, idRequerimiento: number): void {
    this.listaRequerimientosLicitacion = this.listaRequerimientosLicitacion.pipe(
      map((data: LicitacionRequerimiento[]) => data.filter(
        item => !(item.licitacionId === idLicitacion && item.requerimientoId === idRequerimiento))
    ));
    this.licitacionRequerimientoService.eliminar(idLicitacion, idRequerimiento).subscribe(
      () => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_OK;
        this.messageFormReq = VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK;
      },
      error => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_ERROR;
        this.messageFormReq = error;
      }
    );
  }

}
