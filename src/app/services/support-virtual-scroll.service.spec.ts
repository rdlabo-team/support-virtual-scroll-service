import { TestBed } from '@angular/core/testing';

import { SupportVirtualScrollService } from './support-virtual-scroll.service';

describe('SupportVirtualScrollService', () => {
  let service: SupportVirtualScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportVirtualScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
