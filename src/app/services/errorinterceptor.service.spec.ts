import { TestBed } from '@angular/core/testing';

import { ErrorinterceptorService } from './errorinterceptor.service';

describe('ErrorinterceptorService', () => {
  let service: ErrorinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
