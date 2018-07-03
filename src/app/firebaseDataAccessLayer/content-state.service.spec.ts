import { TestBed, inject } from '@angular/core/testing';

import { ContentStateService } from './content-state.service';

describe('ContentStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentStateService]
    });
  });

  it('should be created', inject([ContentStateService], (service: ContentStateService) => {
    expect(service).toBeTruthy();
  }));
});
