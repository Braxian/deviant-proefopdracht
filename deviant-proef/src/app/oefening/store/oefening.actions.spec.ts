import { loadOefening } from './oefening.actions';

describe('Exam Actions', () => {
  it('should create the loadOefening action', () => {
    expect(loadOefening()).toEqual({
      type: '[Oefening] Load Oefening',
    });
  });
});
