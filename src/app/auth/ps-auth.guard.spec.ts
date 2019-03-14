import { TestBed, async, inject } from '@angular/core/testing';

import { PsAuthGuard } from './ps-auth.guard';

describe('PsAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PsAuthGuard]
    });
  });

  it('should ...', inject([PsAuthGuard], (guard: PsAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
