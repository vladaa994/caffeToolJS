import { TestBed, async, inject } from '@angular/core/testing';

import { CheckLoggedInGuard } from './check-logged-in.guard';

describe('CheckLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckLoggedInGuard]
    });
  });

  it('should ...', inject([CheckLoggedInGuard], (guard: CheckLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
