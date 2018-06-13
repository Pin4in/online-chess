import { TestBed, inject } from '@angular/core/testing';

import { FieldStateService } from './field-state.service';

describe('FieldStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldStateService]
    });
  });

  it('should be created', inject([FieldStateService], (service: FieldStateService) => {
    expect(service).toBeTruthy();
  }));
});
