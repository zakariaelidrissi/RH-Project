import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeFormationsComponent } from './employe-formations.component';

describe('EmployeFormationsComponent', () => {
  let component: EmployeFormationsComponent;
  let fixture: ComponentFixture<EmployeFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
