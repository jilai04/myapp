import { TestBed } from '@angular/core/testing';

import { TestheroService } from './testhero.service';

describe('TestheroService', () => {
  let service: TestheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
