import { TestBed, inject } from '@angular/core/testing';

import { CurrentProfileStateService } from './current-profile-state.service';

describe('CurrentProfileStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentProfileStateService]
    });
  });

  it('should be created', inject([CurrentProfileStateService], (service: CurrentProfileStateService) => {
    expect(service).toBeTruthy();
  }));
});
