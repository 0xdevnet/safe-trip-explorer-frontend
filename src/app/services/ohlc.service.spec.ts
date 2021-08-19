import { TestBed } from '@angular/core/testing';

import { OhlcService } from './ohlc.service';

describe('OhlcService', () => {
  let service: OhlcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OhlcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
