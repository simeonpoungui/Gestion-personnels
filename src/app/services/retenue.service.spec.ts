import { TestBed } from '@angular/core/testing';

import { RetenueService } from './retenue.service';

describe('RetenueService', () => {
  let service: RetenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
