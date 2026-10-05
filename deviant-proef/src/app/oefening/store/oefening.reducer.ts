import { createReducer, on } from '@ngrx/store';
import {
  clearOefening,
  loadOefening,
  loadOefeningFailure,
  loadOefeningSuccess,
  restoreOefening,
  setAnswer,
  setOefeningFinished,
  setOefeningStarted,
} from './oefening.actions';
import { Oefening } from '../models/oefening.model';

export interface OefeningState {
  oefening: Oefening | null;
  loading: boolean;
  error: string | null;
  started: boolean;
  finished: boolean;
}

export const initialState: OefeningState = {
  oefening: null,
  loading: false,
  error: null,
  started: false,
  finished: false,
};

export const oefeningReducer = createReducer(
  initialState,

  on(loadOefening, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadOefeningSuccess, (state, { oefening }) => ({
    ...state,
    oefening,
    loading: false,
  })),

  on(loadOefeningFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(setOefeningStarted, (state) => ({
    ...state,
    started: true,
  })),

  on(setOefeningFinished, (state) => ({
    ...state,
    finished: true,
  })),
  on(restoreOefening, (state, { state: restoredOefening }) => ({
    ...state,
    ...restoredOefening,
  })),
  on(setAnswer, (state, { questionId, userAnswer }) => ({
    ...state,
    oefening: state.oefening
      ? {
          ...state.oefening,
          questions: state.oefening.questions.map((question) =>
            question.questionId === questionId ? { ...question, userAnswer: userAnswer } : question,
          ),
        }
      : null,
  })),
  on(clearOefening, (state) => ({
    ...state,
    finished: false,
    started: false,
  })),
);
