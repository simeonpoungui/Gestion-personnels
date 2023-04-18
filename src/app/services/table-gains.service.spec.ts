import { TestBed } from '@angular/core/testing';

import { TableGainsService } from './table-gains.service';

describe('TableGainsService', () => {
  let service: TableGainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableGainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
