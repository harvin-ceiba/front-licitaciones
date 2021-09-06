import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_LICITACION_OK = 'Licitacion actualizada satisfactoriamente';
const VALOR_TEXTO_MENSAJE_PUBLICACION_LICITACION_OK = 'Licitacion publicada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

const LONGITUD_MINIMA_PERMITIDA_TEXTO_CODIGO = 5;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_CODIGO = 25;
const LONGITUD_MINIMA_PERMITIDA_TEXTO_NOMBRE = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO_NOMBRE = 125;

@Component({
  selector: 'app-editar-licitacion',
  templateUrl: './editar-licitacion.component.html',
  styleUrls: ['./editar-licitacion.component.css']
})
export class EditarLicitacionComponent implements OnInit {

  currentLicitacionId: number;
  licitacionForm: FormGroup;
  showMessage = false;
  typeMessage: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected licitacionService: LicitacionService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerLicitacion(this.route.snapshot.params.id);
  }

  private construirFormulario() {
    this.showMessage = VALOR_NO_MOSTRAR_MENSAJE;
    this.licitacionForm = this.formBuilder.group({
      id: [''],
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

  obtenerLicitacion(id: number): void {
    this.currentLicitacionId = id;
    this.licitacionService.consultarPorId(id).subscribe(
        data => {
          this.licitacionForm.patchValue(data);
        },
        error => {
          this.showMessage = VALOR_MOSTRAR_MENSAJE;
          this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
          this.message = error.error.mensage;
        });
  }

  editarLicitacion() {
    this.licitacionService.editar(this.licitacionForm.value).subscribe(
      () => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_OK;
        this.message = VALOR_TEXTO_MENSAJE_LICITACION_OK;
        // this.router.navigate(['/licitacion/listar']);
      },
      error => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
        this.message = error.error.mensage;
      }
    );
  }

  publicarLicitacion(id: number) {
    this.licitacionService.publicar(id).subscribe(
      () => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_OK;
        this.message = VALOR_TEXTO_MENSAJE_PUBLICACION_LICITACION_OK;
        this.licitacionForm.controls.estado.patchValue(1);
        // this.router.navigate(['/licitacion/listar']);
      },
      error => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
        this.message = error.error.mensage;
      }
    );
  }

}
