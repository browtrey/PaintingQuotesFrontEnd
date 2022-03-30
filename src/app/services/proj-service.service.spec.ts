import { TestBed } from '@angular/core/testing';

import { ProjServiceService } from './proj-service.service';

describe('ProjServiceService', () => {
  let service: ProjServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
