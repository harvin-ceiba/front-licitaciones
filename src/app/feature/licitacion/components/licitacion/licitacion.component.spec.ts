import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LicitacionComponent } from './licitacion.component';

describe('LicitacionComponent', () => {
  let component: LicitacionComponent;
  let fixture: ComponentFixture<LicitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicitacionComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
