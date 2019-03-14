import { TestBed } from '@angular/core/testing';

import { AmAuthService } from './am-auth.service';

describe('AmAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmAuthService = TestBed.get(AmAuthService);
    expect(service).toBeTruthy();
  });
});
