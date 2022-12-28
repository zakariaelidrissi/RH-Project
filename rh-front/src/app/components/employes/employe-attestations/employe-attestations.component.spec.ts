import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAttestationsComponent } from './employe-attestations.component';

describe('EmployeAttestationsComponent', () => {
  let component: EmployeAttestationsComponent;
  let fixture: ComponentFixture<EmployeAttestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeAttestationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
