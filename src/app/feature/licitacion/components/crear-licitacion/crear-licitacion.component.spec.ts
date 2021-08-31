import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLicitacionComponent } from './crear-licitacion.component';

describe('CrearLicitacionComponent', () => {
  let component: CrearLicitacionComponent;
  let fixture: ComponentFixture<CrearLicitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLicitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLicitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
