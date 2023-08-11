import { TestBed } from '@angular/core/testing';

import { PreinscritoServiceService } from './preinscrito-service.service';

describe('PreinscritoServiceService', () => {
  let service: PreinscritoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreinscritoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
