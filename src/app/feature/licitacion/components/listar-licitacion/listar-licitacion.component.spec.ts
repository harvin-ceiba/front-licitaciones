import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLicitacionComponent } from './listar-licitacion.component';

describe('ListarLicitacionComponent', () => {
  let component: ListarLicitacionComponent;
  let fixture: ComponentFixture<ListarLicitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLicitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLicitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
