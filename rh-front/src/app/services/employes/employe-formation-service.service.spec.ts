import { TestBed } from '@angular/core/testing';

import { EmployeFormationServiceService } from './employe-formation-service.service';

describe('EmployeFormationServiceService', () => {
  let service: EmployeFormationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeFormationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
