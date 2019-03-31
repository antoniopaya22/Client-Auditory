import { TestBed } from '@angular/core/testing';

import { DeviceReadService } from './device-read.service';

describe('DeviceReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceReadService = TestBed.get(DeviceReadService);
    expect(service).toBeTruthy();
  });
});
