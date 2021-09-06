import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { EditarPropuestaComponent } from './components/editar-propuesta/editar-propuesta.component';
import { ListarLicitacionPublicaComponent } from './components/listar-licitacion-publica/listar-licitacion-publica.component';
import { ListarPropuestaComponent } from './components/listar-propuesta/listar-propuesta.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { VerPropuestaComponent } from './components/ver-propuesta/ver-propuesta.component';

const routes: Routes = [
  {
    path: '',
    component: PropuestaComponent,
    children: [
      {
        path: 'listar_licitaciones',
        component: ListarLicitacionPublicaComponent
      },
      {
        path: 'crear/:id',
        component: CrearPropuestaComponent
      },
      {
        path: 'listar',
        component: ListarPropuestaComponent
      },
      {
        path: 'ver/:id',
        component: VerPropuestaComponent
      },
      {
        path: 'editar/:id',
        component: EditarPropuestaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropuestaRoutingModule { }
