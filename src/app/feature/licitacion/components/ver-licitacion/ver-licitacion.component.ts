import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { LicitacionRequerimiento } from 'src/app/feature/licitacion-requerimiento/shared/model/licitacion-requerimiento';
import { LicitacionRequerimientoService } from 'src/app/feature/licitacion-requerimiento/shared/service/licitacion-requerimiento.service';

@Component({
  selector: 'app-ver-licitacion',
  templateUrl: './ver-licitacion.component.html',
  styleUrls: ['./ver-licitacion.component.css']
})
export class VerLicitacionComponent implements OnInit {

  public currentLicitacion: Licitacion = {
    id: null,
    codigo: '',
    nombre: '',
    descripcion: '',
    presupuesto: null,
    fechaInicio: null,
    fechaFin: null,
    estado: null
  };

  listaRequerimientosLicitacion: LicitacionRequerimiento[];
  mostrarRequerimientos = false;

  listaPropuestas: Propuesta[];
  mostrarPropuestas = false;

  constructor(
    protected licitacionService: LicitacionService,
    protected propuestaService: PropuestaService,
    protected licitacionRequerimientoService: LicitacionRequerimientoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerLicitacion(this.route.snapshot.params.id);
    this.obtenerRequerimientosLicitacion(this.route.snapshot.params.id);
    this.obtenerPropuestasLicitacion(this.route.snapshot.params.id);
  }

  obtenerLicitacion(id: number): void {
    this.licitacionService.consultarPorId(id).subscribe(data => {
      this.currentLicitacion = data;
    });
  }

  obtenerRequerimientosLicitacion(id: number): void {
    this.licitacionRequerimientoService.consultar(id).subscribe(data => {
      this.listaRequerimientosLicitacion = data;
      this.mostrarRequerimientos = true;
    });
  }

  obtenerPropuestasLicitacion(idLicitacion: number): void {
    this.propuestaService.consultarPorIdLicitacion(idLicitacion).subscribe(response => {
      this.listaPropuestas = response;
      this.listaPropuestas = this.listaPropuestas.filter(item => item.estado === 1);
      this.mostrarPropuestas = this.listaPropuestas !== undefined && this.listaPropuestas.length > 0;
    });
  }

}
