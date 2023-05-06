import { TestBed } from '@angular/core/testing';

import { ButtonClickedService } from './button-clicked.service';

describe('ButtonClickedService', () => {
  let service: ButtonClickedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonClickedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
