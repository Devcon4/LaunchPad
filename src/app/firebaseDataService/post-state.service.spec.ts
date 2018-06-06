import { TestBed, inject } from '@angular/core/testing';

import { PostStateService } from './post-state.service';

describe('PostStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostStateService]
    });
  });

  it('should be created', inject([PostStateService], (service: PostStateService) => {
    expect(service).toBeTruthy();
  }));
});
