import { TestBed } from '@angular/core/testing';

import { EmployeeValidatorService } from './employee-validator.service';

describe('EmployeeValidatorService', () => {
  let service: EmployeeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
