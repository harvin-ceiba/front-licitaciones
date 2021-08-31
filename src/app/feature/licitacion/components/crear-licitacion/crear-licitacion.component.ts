import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';

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

  constructor(
    private fb: FormBuilder, 
    protected licitacionService: LicitacionService) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario() {
    this.licitacionForm = this.fb.group({
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
      estado: [null, []]
    });
  }

  guardarLicitacion() {
    this.licitacionService.guardar(this.licitacionForm.value).subscribe({
      next: data => {
        console.log("There is data", data)
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
