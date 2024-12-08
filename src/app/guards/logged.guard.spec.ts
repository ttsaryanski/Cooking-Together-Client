import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { logedGuard } from './logged.guard';

describe('logedGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => logedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
