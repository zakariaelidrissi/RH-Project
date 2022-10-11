import { TestBed } from '@angular/core/testing';

import { CollService } from './coll.service';

describe('CollService', () => {
  let service: CollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
