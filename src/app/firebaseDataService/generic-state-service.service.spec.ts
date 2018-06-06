import { TestBed, inject } from '@angular/core/testing';

import { GenericStateServiceService } from './generic-state-service.service';

describe('GenericStateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericStateServiceService]
    });
  });

  it('should be created', inject([GenericStateServiceService], (service: GenericStateServiceService<any>) => {
    expect(service).toBeTruthy();
  }));
});
