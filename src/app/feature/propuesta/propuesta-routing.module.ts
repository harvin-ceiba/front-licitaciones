import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarLicitacionComponent } from '@licitacion/components/listar-licitacion/listar-licitacion.component';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';

const routes: Routes = [
  {
    path: '',
    component: PropuestaComponent,
    children: [
      {
        path: 'crear',
        component: CrearPropuestaComponent
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
export class PropuestaRoutingModule { }
