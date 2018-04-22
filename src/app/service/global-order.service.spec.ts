import { TestBed, inject } from '@angular/core/testing';

import { GlobalOrderService } from './global-order.service';

describe('GlobalOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalOrderService]
    });
  });

  it('should be created', inject([GlobalOrderService], (service: GlobalOrderService) => {
    expect(service).toBeTruthy();
  }));
});
