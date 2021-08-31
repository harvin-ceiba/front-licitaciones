import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-base';
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'Inicio' },
    { url: '/producto', nombre: 'Producto' },
    { url: '/licitacion', nombre: 'Gestión Licitaciones' },
    { url: '/propuesta', nombre: 'Mis Propuestas' }
  ];

  
}
