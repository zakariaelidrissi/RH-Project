import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreStageComponent } from './offre-stage.component';

describe('OffreStageComponent', () => {
  let component: OffreStageComponent;
  let fixture: ComponentFixture<OffreStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
