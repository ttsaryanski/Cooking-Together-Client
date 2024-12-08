import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { isAuthenticated } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAuthenticated(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
