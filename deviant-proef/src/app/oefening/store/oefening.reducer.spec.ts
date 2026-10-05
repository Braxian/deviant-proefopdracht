import {
  loadOefening,
  loadOefeningFailure,
  loadOefeningSuccess,
  setAnswer,
} from './oefening.actions';
import { oefeningReducer, initialState } from './oefening.reducer';
import { Oefening } from '../models/oefening.model';

const oefening: Oefening = {
  name: 'Test oefening',
  introText: 'Dit is een test',
  questions: [
    {
      questionId: 1,
      question: 'Wat is 2 + 2?',
      questionType: 'multiple_choice',
      answers: [],
      userAnswer: null,
    },
    {
      questionId: 2,
      question: 'Vertel iets leuks',
      questionType: 'open_question',
      userAnswer: null,
    },
  ],
  started: false,
  finished: false,
};
describe('Oefening Reducer', () => {
  it('should set loading to true when loading questions', () => {
    const state = oefeningReducer(initialState, loadOefening());

    expect(state.loading).toBe(true);
  });

  it('should set oefening when loading oefening and set loading to false', () => {
    const loadingState = {
      ...initialState,
      loading: true,
    };
    const action = loadOefeningSuccess({
      oefening,
    });
    const state = oefeningReducer(loadingState, action);

    expect(state.oefening).toEqual(oefening);
    expect(state.loading).toBe(false);
  });

  it('should set error when failing to load oefening and set loading to false', () => {
    const errorMessage = 'Fout tijdens het laden';
    const state = oefeningReducer(initialState, loadOefeningFailure({ error: errorMessage }));

    expect(state.error).toEqual('Fout tijdens het laden');
    expect(state.loading).toBe(false);
  });

  it('should set the answer for the correct question', () => {
    const state = {
      ...initialState,
      oefening,
    };

    const action = setAnswer({
      questionId: 1,
      userAnswer: 102,
    });

    const newState = oefeningReducer(state, action);

    expect(newState.oefening?.questions[0].userAnswer).toBe(102);
  });
});
