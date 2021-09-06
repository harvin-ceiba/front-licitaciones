import { Component, OnInit } from '@angular/core';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_OK = 'Licitacion eliminada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

@Component({
  selector: 'app-listar-propuesta',
  templateUrl: './listar-propuesta.component.html',
  styleUrls: ['./listar-propuesta.component.css']
})
export class ListarPropuestaComponent implements OnInit {

  listaPropuestas$: Observable<Propuesta[]>;
  isAdmin = true;
  showMessage = false;
  typeMessage: string;
  message: string;

  constructor(protected propuestaService: PropuestaService) { }

  ngOnInit(): void {
    this.showMessage = VALOR_NO_MOSTRAR_MENSAJE;
    this.obtenerPropuestas();
  }

  obtenerPropuestas(): void {
    this.listaPropuestas$ = this.propuestaService.consultarTodos();
  }

  eliminarPropuesta(idLicitacion: number, idPropuesta: number): void {
    this.listaPropuestas$ = this.listaPropuestas$.pipe(
      map((propuestas: Propuesta[]) => propuestas.filter(propuesta => propuesta.id !== idPropuesta))
    );
    this.propuestaService.eliminar(idLicitacion, idPropuesta).subscribe(
      () => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_OK;
        this.message = VALOR_TEXTO_MENSAJE_OK;
      },
      error => {
        this.showMessage = VALOR_MOSTRAR_MENSAJE;
        this.typeMessage = VALOR_TIPO_MENSAJE_ERROR;
        this.message = error.error.mensage;
      }
    );
  }

}
