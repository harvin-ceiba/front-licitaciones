import { Component, OnInit } from '@angular/core';

import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-licitacion',
  templateUrl: './listar-licitacion.component.html',
  styleUrls: ['./listar-licitacion.component.css']
})
export class ListarLicitacionComponent implements OnInit {

  public listaLicitaciones : Observable<Licitacion[]>;

  constructor(protected licitacionService: LicitacionService) { }

  ngOnInit() {
    this.listaLicitaciones = this.licitacionService.consultar();
  }

  eliminarLicitacion(id:number) {
    console.log("id ", id);
    let licitacion = new Licitacion(1, "abc", "nombre", "descripcion", 1000, new Date('2021-08-01'), new Date('2021-08-31'), 1);
    this.licitacionService.eliminar(licitacion);
  }

}
