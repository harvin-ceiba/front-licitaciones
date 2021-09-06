import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Licitacion } from '@licitacion/shared/model/licitacion';
import { LicitacionService } from '@licitacion/shared/service/licitacion.service';
import { of } from 'rxjs';

import { ListarLicitacionPublicaComponent } from './listar-licitacion-publica.component';

describe('ListarLicitacionPublicaComponent', () => {
  let component: ListarLicitacionPublicaComponent;
  let fixture: ComponentFixture<ListarLicitacionPublicaComponent>;
  let licitacionService: LicitacionService;

  const dummyLicitaciones: Licitacion[] = [
    new Licitacion(1, 'CODIGO1', 'TITULO_LICITACION1', 'DESCRIPCION1', 1000, new Date('2021-08-01'), new Date('2021-08-31'), 1),
    new Licitacion(2, 'CODIGO2', 'TITULO_LICITACION2', 'DESCRIPCION2', 2000, new Date('2021-09-01'), new Date('2021-09-30'), 1),
    new Licitacion(1, 'CODIGO3', 'TITULO_LICITACION3', 'DESCRIPCION1', 1000, new Date('2021-08-01'), new Date('2021-08-31'), 0)
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLicitacionPublicaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [LicitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLicitacionPublicaComponent);
    component = fixture.componentInstance;
    licitacionService = TestBed.inject(LicitacionService);
    spyOn(licitacionService, 'consultarTodos').and.returnValue(of(dummyLicitaciones));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener las licitaciones que han sido publicadas', () => {
    component.listaLicitacionesPublicadas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });
});
