import { TestBed, inject } from '@angular/core/testing';

import { MoveValidationService } from './move-validation.service';

describe('MoveValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveValidationService]
    });
  });

  it('should be created', inject([MoveValidationService], (service: MoveValidationService) => {
    expect(service).toBeTruthy();
  }));
});
