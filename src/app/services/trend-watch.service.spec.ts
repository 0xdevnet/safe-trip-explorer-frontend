import { TestBed } from '@angular/core/testing';

import { TrendWatchService } from './trend-watch.service';

describe('TrendWatchService', () => {
  let service: TrendWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
