import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requerimiento } from 'src/app/feature/requerimiento/shared/model/requerimiento';
import { RequerimientoService } from 'src/app/feature/requerimiento/shared/service/requerimiento.service';
import { PropuestaRequerimiento } from '../../shared/model/propuesta-requerimiento';
import { PropuestaRequerimientoService } from '../../shared/service/propuesta-requerimiento.service';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK = 'Requerimiento registrado satisfactoriamente';
const VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK = 'Requerimiento eliminado satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

@Component({
  selector: 'app-propuesta-requerimiento',
  templateUrl: './propuesta-requerimiento.component.html',
  styleUrls: ['./propuesta-requerimiento.component.css']
})
export class PropuestaRequerimientoComponent implements OnInit {

  @Input() propuestaId: number;
  listaRequerimientos: Observable<Requerimiento[]>;
  listaRequerimientosPropuesta: Observable<PropuestaRequerimiento[]>;
  requerimientosForm: FormGroup;
  showMessageFormReq = false;
  typeMessageFormReq: string;
  messageFormReq: string;

  constructor(
    private formBuilder: FormBuilder,
    protected requerimientoService: RequerimientoService,
    protected propuestaRequerimientoService: PropuestaRequerimientoService
  ) { }

  ngOnInit(): void {
    this.construirFormularioRequerimientos();
    this.obtenerListaRequerimientos();
    this.obtenerRequerimientosPropuesta(this.propuestaId);
  }

  construirFormularioRequerimientos(): void {
    this.showMessageFormReq = VALOR_NO_MOSTRAR_MENSAJE;
    this.requerimientosForm = this.formBuilder.group({
      propuestaId: [this.propuestaId],
      requerimientoId: [null, [Validators.required]]
    });
  }

  obtenerListaRequerimientos(): void {
    of(this.requerimientoService.consultar()).subscribe(data => {
      this.listaRequerimientos = data;
    });
  }

  obtenerRequerimientosPropuesta(id: number): void {
    of(this.propuestaRequerimientoService.consultar(id)).subscribe(data => {
      this.listaRequerimientosPropuesta = data;
    });
  }

  guardarRequerimiento(): void {
    this.propuestaRequerimientoService.guardar(this.requerimientosForm.value).subscribe(
      () => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_OK;
        this.messageFormReq = VALOR_TEXTO_MENSAJE_REQUERIMIENTO_OK;
      },
      error => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_ERROR;
        this.messageFormReq = error.error.mensaje;
      }
    );
    this.obtenerRequerimientosPropuesta(this.propuestaId);
  }

  eliminarRequerimiento(idPropuesta: number, idRequerimiento: number): void {
    this.listaRequerimientosPropuesta = this.listaRequerimientosPropuesta.pipe(
      map((data: PropuestaRequerimiento[]) => data.filter(
        item => !(item.propuestaId === idPropuesta && item.requerimientoId === idRequerimiento))
    ));
    this.propuestaRequerimientoService.eliminar(idPropuesta, idRequerimiento).subscribe(
      () => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_OK;
        this.messageFormReq = VALOR_TEXTO_MENSAJE_ELIMINACION_REQUERIMIENTO_OK;
      },
      error => {
        this.showMessageFormReq = VALOR_MOSTRAR_MENSAJE;
        this.typeMessageFormReq = VALOR_TIPO_MENSAJE_ERROR;
        this.messageFormReq = error.error.mensaje;
      }
    );
  }

}
