import { TestBed } from '@angular/core/testing';

import { CountrystatecityService } from './countrystatecity.service';

describe('CountrystatecityService', () => {
  let service: CountrystatecityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrystatecityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
