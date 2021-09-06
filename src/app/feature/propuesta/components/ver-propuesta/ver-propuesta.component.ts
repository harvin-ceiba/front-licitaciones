import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propuesta } from '@propuesta/shared/model/propuesta';
import { PropuestaService } from '@propuesta/shared/service/propuesta.service';
import { Observable, of } from 'rxjs';
import { PropuestaRequerimiento } from 'src/app/feature/propuesta-requerimiento/shared/model/propuesta-requerimiento';
import { PropuestaRequerimientoService } from 'src/app/feature/propuesta-requerimiento/shared/service/propuesta-requerimiento.service';

@Component({
  selector: 'app-ver-propuesta',
  templateUrl: './ver-propuesta.component.html',
  styleUrls: ['./ver-propuesta.component.css']
})
export class VerPropuestaComponent implements OnInit {

  public propuesta: Propuesta = {
    id: null,
    licitacionId: null,
    nombre: '',
    descripcion: '',
    nombreCliente: '',
    valor: null,
    fechaCreacion: null,
    fechaPublicacion: null,
    estado: null
  };

  listaRequerimientosPropuesta: Observable<PropuestaRequerimiento[]>;
  mostrarRequerimientos = false;

  constructor(
    private route: ActivatedRoute,
    protected propuestaService: PropuestaService,
    protected propuestaRequerimientoService: PropuestaRequerimientoService
  ) { }

  ngOnInit(): void {
    this.obtenerPropuesta(this.route.snapshot.params.id);
    this.obtenerRequerimientosPropuesta(this.route.snapshot.params.id);
  }

  obtenerPropuesta(id: number): void {
    this.propuestaService.consultarPorId(id).subscribe(data => {
      this.propuesta = data;
    });
  }

  obtenerRequerimientosPropuesta(id: number): void {
    of(this.propuestaRequerimientoService.consultar(id)).subscribe(data => {
      this.listaRequerimientosPropuesta = data;
      this.mostrarRequerimientos = true;
    });
  }

}
