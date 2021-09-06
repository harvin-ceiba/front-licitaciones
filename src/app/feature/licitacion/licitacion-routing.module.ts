import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearLicitacionComponent } from './components/crear-licitacion/crear-licitacion.component';
import { ListarLicitacionComponent } from './components/listar-licitacion/listar-licitacion.component';
import { LicitacionComponent } from './components/licitacion/licitacion.component';
import { VerLicitacionComponent } from './components/ver-licitacion/ver-licitacion.component';
import { EditarLicitacionComponent } from './components/editar-licitacion/editar-licitacion.component';

const routes: Routes = [
  {
    path: '',
    component: LicitacionComponent,
    children: [
      {
        path: 'listar',
        component: ListarLicitacionComponent
      },
      {
        path: 'crear',
        component: CrearLicitacionComponent
      },
      {
        path: 'ver/:id',
        component: VerLicitacionComponent
      },
      {
        path: 'editar/:id',
        component: EditarLicitacionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacionRoutingModule { }
