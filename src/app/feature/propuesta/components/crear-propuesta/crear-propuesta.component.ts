import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_OK = 'Propuesta registrada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE = 125;
const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE_CLIENTE = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE_CLIENTE = 125;

@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent implements OnInit {

  currentLicitacionId: number;
  propuestaForm: FormGroup;
  showMessage = false;
  typeMessage: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected propuestaService: PropuestaService
  ) { }

  ngOnInit(): void {
    this.currentLicitacionId = this.route.snapshot.params.id;
    this.construirFormulario();
  }

  private construirFormulario() {
    this.showMessage = VALOR_NO_MOSTRAR_MENSAJE;
    this.propuestaForm = this.formBuilder.group({
      nombre: ['', [Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE)
      ]],
      descripcion: ['', [Validators.required]],
      nombreCliente: ['', [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE_CLIENTE),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE_CLIENTE)
      ]],
      valor: ['', [Validators.required]],
      estado: ['']
    });
  }

  guardarPropuesta() {
    this.propuestaService.guardar(this.currentLicitacionId, this.propuestaForm.value).subscribe({
      next: () => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_OK;
        this.message = VALOR_TEXTO_MENSAJE_OK;
        this.propuestaForm.reset();
      },
      error: error => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
        this.message = error.error.mensaje;
      }
    });
  }

}
