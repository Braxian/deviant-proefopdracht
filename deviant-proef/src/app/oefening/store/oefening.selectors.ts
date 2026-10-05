import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OefeningState } from './oefening.reducer';

export const selectOefeningState = createFeatureSelector<OefeningState>('oefening');

export const selectOefening = createSelector(selectOefeningState, (state) => state.oefening);

export const selectQuestions = createSelector(
  selectOefening,
  (oefening) => oefening?.questions ?? [],
);

export const selectLoading = createSelector(selectOefeningState, (state) => state.loading);

export const selectError = createSelector(selectOefeningState, (state) => state.error);

export const selectStarted = createSelector(selectOefeningState, (state) => state.started);

export const selectFinished = createSelector(selectOefeningState, (state) => state.finished);
