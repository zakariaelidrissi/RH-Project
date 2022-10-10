import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmployerComponent } from './gestion-employer.component';

describe('GestionEmployerComponent', () => {
  let component: GestionEmployerComponent;
  let fixture: ComponentFixture<GestionEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
