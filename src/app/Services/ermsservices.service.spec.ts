import { TestBed } from '@angular/core/testing';

import { ERMSServices } from './ermsservices.service';

describe('ERMSServicesService', () => {
  let service: ERMSServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ERMSServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
