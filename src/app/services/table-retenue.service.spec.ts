import { TestBed } from '@angular/core/testing';

import { TableRetenueService } from './table-retenue.service';

describe('TableRetenueService', () => {
  let service: TableRetenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRetenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
