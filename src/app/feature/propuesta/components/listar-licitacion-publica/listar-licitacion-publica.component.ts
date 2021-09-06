import { Component, Input, OnInit } from '@angular/core';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-licitacion-publica',
  templateUrl: './listar-licitacion-publica.component.html',
  styleUrls: ['./listar-licitacion-publica.component.css']
})
export class ListarLicitacionPublicaComponent implements OnInit {

  @Input() isAdmin = false;

  public listaLicitacionesPublicadas: Observable<Licitacion[]>;

  constructor(protected licitacionService: LicitacionService) { }

  ngOnInit() {
    this.obtenerLicitacionesPublicas();
  }

  obtenerLicitacionesPublicas() {
    this.listaLicitacionesPublicadas = this.licitacionService.consultarTodos().pipe(
      map(response => response.filter(item => item.estado === 1)));
  }

}
