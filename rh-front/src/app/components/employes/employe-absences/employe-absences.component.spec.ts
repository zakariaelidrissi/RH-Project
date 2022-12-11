import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAbsencesComponent } from './employe-absences.component';

describe('EmployeAbsencesComponent', () => {
  let component: EmployeAbsencesComponent;
  let fixture: ComponentFixture<EmployeAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
