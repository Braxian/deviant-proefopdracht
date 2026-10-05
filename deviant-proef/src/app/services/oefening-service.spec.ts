import { TestBed } from '@angular/core/testing';
import { OefeningService } from './oefening-service';

describe('OefeningService', () => {
  let service: OefeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OefeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
