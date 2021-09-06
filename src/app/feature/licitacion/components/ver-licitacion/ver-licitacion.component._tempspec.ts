import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLicitacionComponent } from './ver-licitacion.component';

describe('VerLicitacionComponent', () => {
  let component: VerLicitacionComponent;
  let fixture: ComponentFixture<VerLicitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerLicitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLicitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
