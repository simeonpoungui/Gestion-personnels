import { TestBed } from '@angular/core/testing';

import { ArrondisssementService } from './arrondissement.service';

describe('ArrondissementService', () => {
  let service: ArrondisssementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrondisssementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
