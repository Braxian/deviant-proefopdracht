import { createAction, props } from '@ngrx/store';
import { Oefening } from '../models/oefening.model';
import { OefeningState } from './oefening.reducer';

export const loadOefening = createAction('[Oefening] Load Oefening');

export const loadOefeningSuccess = createAction(
  '[Oefening] Load Oefening Success',
  props<{ oefening: Oefening }>(),
);

export const loadOefeningFailure = createAction(
  '[Oefening] Load Oefening Failure',
  props<{ error: string }>(),
);

export const setAnswer = createAction(
  '[Oefening] Set answer',
  props<{
    questionId: number;
    userAnswer: number | string | null;
  }>(),
);

export const setOefeningStarted = createAction('[Oefening] Set oefening started');
export const setOefeningFinished = createAction('[Oefening] Set oefening finished');

export const restoreOefening = createAction(
  '[oefening] Restore oefening',
  props<{ state: OefeningState }>(),
);

export const clearOefening = createAction('[Oefening] Set clean oefening');
