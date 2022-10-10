import { TestBed } from '@angular/core/testing';

import { GestionEmployerService } from './gestion-employer.service';

describe('GestionEmployerService', () => {
  let service: GestionEmployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEmployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
