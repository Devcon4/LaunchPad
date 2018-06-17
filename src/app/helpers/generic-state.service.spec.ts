import { TestBed, inject } from '@angular/core/testing';

import { GenericStateService } from './generic-state.service';

describe('GenericStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericStateService]
    });
  });

  it('should be created', inject([GenericStateService], (service: GenericStateService) => {
    expect(service).toBeTruthy();
  }));
});
