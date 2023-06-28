import { TestBed } from '@angular/core/testing';

import { AccDetailsService } from './accdetails.service';

describe('AccDetailsService', () => {
  let service: AccDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
