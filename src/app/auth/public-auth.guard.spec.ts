import { TestBed, async, inject } from '@angular/core/testing';

import { PublicAuthGuard } from './public-auth.guard';

describe('PublicAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicAuthGuard]
    });
  });

  it('should ...', inject([PublicAuthGuard], (guard: PublicAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
