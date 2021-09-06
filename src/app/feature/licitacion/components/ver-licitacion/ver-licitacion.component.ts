import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  listaRequerimientosLicitacion: Observable<LicitacionRequerimiento[]>;
  mostrarRequerimientos = false;

  listaPropuestas: Observable<Propuesta[]>;

  constructor(
    protected route: ActivatedRoute,
    protected licitacionService: LicitacionService,
    protected propuestaService: PropuestaService,
    protected licitacionRequerimientoService: LicitacionRequerimientoService
  ) { }

  ngOnInit(): void {
    this.currentLicitacion.id = this.route.snapshot.params.id;
    this.obtenerLicitacion();
    this.obtenerRequerimientosLicitacion();
    this.obtenerPropuestasLicitacion();
  }

  obtenerLicitacion(): void {
    this.licitacionService.consultarPorId(this.currentLicitacion.id).subscribe(data => {
      this.currentLicitacion = data;
    });
  }

  obtenerRequerimientosLicitacion(): void {
    of(this.licitacionRequerimientoService.consultar(this.currentLicitacion.id)).subscribe(data => {
      this.listaRequerimientosLicitacion = data;
      this.mostrarRequerimientos = true;
    });
  }

  obtenerPropuestasLicitacion(): void {
    of(this.propuestaService.consultarPorIdLicitacion(this.currentLicitacion.id)).subscribe(response => {
      this.listaPropuestas = response.pipe(
        map((data: Propuesta[]) => data.filter(item => item.estado === 1))
      );
    });
  }

}
