import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearLicitacionComponent } from './components/crear-licitacion/crear-licitacion.component';
import { ListarLicitacionComponent } from './components/listar-licitacion/listar-licitacion.component';
import { LicitacionComponent } from './components/licitacion/licitacion.component';

const routes: Routes = [
  {
    path: '',
    component: LicitacionComponent,
    children: [
      {
        path: 'crear',
        component: CrearLicitacionComponent
      },
      {
        path: 'listar',
        component: ListarLicitacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacionRoutingModule { }
