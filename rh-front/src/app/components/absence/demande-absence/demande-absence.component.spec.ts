import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAbsencesComponent } from './demande-absence.component';

describe('DemandeAbsenceComponent', () => {
  let component: DemandeAbsencesComponent;
  let fixture: ComponentFixture<DemandeAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
