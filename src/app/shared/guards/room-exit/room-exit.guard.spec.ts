import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { roomExitGuard } from './room-exit.guard';

describe('roomExitGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roomExitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
