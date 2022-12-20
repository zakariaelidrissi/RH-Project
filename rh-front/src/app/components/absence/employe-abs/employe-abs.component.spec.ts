import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAbsComponent } from './employe-abs.component';

describe('EmployeAbsComponent', () => {
  let component: EmployeAbsComponent;
  let fixture: ComponentFixture<EmployeAbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeAbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeAbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
