import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_OK = 'Licitacion registrada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

const LONGITUD_MINIMA_PERMITIDA_TEXTO_CODIGO = 5;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_CODIGO = 25;
const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE = 125;

@Component({
  selector: 'app-crear-licitacion',
  templateUrl: './crear-licitacion.component.html',
  styleUrls: ['./crear-licitacion.component.css']
})
export class CrearLicitacionComponent implements OnInit {

  licitacionForm: FormGroup;
  showMessage = false;
  typeMessage: string;
  message: string;

  constructor(private formBuilder: FormBuilder, protected licitacionService: LicitacionService) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario() {
    this.showMessage = VALOR_NO_MOSTRAR_MENSAJE;
    this.licitacionForm = this.formBuilder.group({
      codigo: ['', [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_CODIGO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO_CODIGO)
      ]],
      nombre: ['', [Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE)
      ]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      presupuesto: ['', [Validators.required]],
      estado: ['']
    });
  }

  guardarLicitacion() {
    this.licitacionService.guardar(this.licitacionForm.value).subscribe(
      () => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_OK;
        this.message = VALOR_TEXTO_MENSAJE_OK;
        this.licitacionForm.reset();
      },
      error => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
        this.message = error.error.mensage;
      }
    );
  }

}
