import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StgabsencesComponent } from './stgabsences.component';

describe('StgabsencesComponent', () => {
  let component: StgabsencesComponent;
  let fixture: ComponentFixture<StgabsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StgabsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StgabsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
