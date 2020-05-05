import { TestBed } from '@angular/core/testing';

import { CoreSocketService } from './core-socket.service';

describe('CoreSocketService', () => {
  let service: CoreSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
