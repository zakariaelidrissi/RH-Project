import { TestBed } from '@angular/core/testing';

import { GestionEmployeService } from './gestion-employe.service';

describe('GestionEmployerService', () => {
  let service: GestionEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
