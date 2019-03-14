import { TestBed, async, inject } from '@angular/core/testing';

import { AmAuthGuard } from './am-auth.guard';

describe('AmAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmAuthGuard]
    });
  });

  it('should ...', inject([AmAuthGuard], (guard: AmAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
