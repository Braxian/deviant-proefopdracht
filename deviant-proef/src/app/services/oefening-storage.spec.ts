import { TestBed } from '@angular/core/testing';
import { OefeningStorage } from './oefening-storage';

describe('OefeningStorage', () => {
  let service: OefeningStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OefeningStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
