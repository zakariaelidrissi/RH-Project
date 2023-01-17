import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StgDemandeAttestationComponent } from './stg-demande-attestation.component';

describe('StgDemandeAttestationComponent', () => {
  let component: StgDemandeAttestationComponent;
  let fixture: ComponentFixture<StgDemandeAttestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StgDemandeAttestationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StgDemandeAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
