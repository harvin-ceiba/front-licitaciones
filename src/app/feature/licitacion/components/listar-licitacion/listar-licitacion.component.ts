import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const VALOR_MOSTRAR_MENSAJE = true;
const VALOR_NO_MOSTRAR_MENSAJE = false;
const VALOR_TIPO_MENSAJE_OK = 'success';
const VALOR_TEXTO_MENSAJE_OK = 'Licitacion eliminada satisfactoriamente';
const VALOR_TIPO_MENSAJE_ERROR = 'danger';

@Component({
  selector: 'app-listar-licitacion',
  templateUrl: './listar-licitacion.component.html',
  styleUrls: ['./listar-licitacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarLicitacionComponent implements OnInit {

  listaLicitaciones$: Observable<Licitacion[]>;
  isAdmin = true;
  showMessage = false;
  typeMessage: string;
  message: string;

  constructor(protected licitacionService: LicitacionService) { }

  ngOnInit() {
    this.showMessage = VALOR_NO_MOSTRAR_MENSAJE;
    this.obtenerLicitaciones();
  }

  obtenerLicitaciones(): void {
    this.listaLicitaciones$ = this.licitacionService.consultarTodos();
  }

  eliminarLicitacion(id: number): void {
    this.listaLicitaciones$ = this.listaLicitaciones$.pipe(
      map((licitaciones: Licitacion[]) => licitaciones.filter(licitacion => licitacion.id !== id))
    );
    this.licitacionService.eliminar(id)
      .subscribe(
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
