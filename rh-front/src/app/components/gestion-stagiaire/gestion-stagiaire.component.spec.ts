import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStagiaireComponent } from './gestion-stagiaire.component';

describe('GestionStagiaireComponent', () => {
  let component: GestionStagiaireComponent;
  let fixture: ComponentFixture<GestionStagiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStagiaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
