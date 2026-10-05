import { Component, inject, effect, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadOefening,
  setOefeningStarted,
  setOefeningFinished,
  restoreOefening,
  setAnswer,
  clearOefening,
} from './store/oefening.actions';
import {
  selectError,
  selectLoading,
  selectOefening,
  selectOefeningState,
  selectQuestions,
  selectStarted,
  selectFinished,
} from './store/oefening.selectors';
import { OefeningStorage } from '../services/oefening-storage';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-oefening',
  styleUrl: './oefening.css',
  templateUrl: './oefening.html',
})
export class Oefening {
  private store = inject(Store);
  private storage = inject(OefeningStorage);
  oefening = this.store.selectSignal(selectOefening);
  questions = this.store.selectSignal(selectQuestions);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);
  started = this.store.selectSignal(selectStarted);
  finished = this.store.selectSignal(selectFinished);
  state = this.store.selectSignal(selectOefeningState);
  textValue = signal<string>('');

  constructor() {
    const savedState = this.storage.load();
    if (savedState) {
      this.store.dispatch(restoreOefening({ state: savedState }));
    } else {
      this.store.dispatch(loadOefening());
    }
  }

  setStarted() {
    this.store.dispatch(setOefeningStarted());
  }

  answerQuestion(questionId: number, answer: number | string) {
    this.store.dispatch(setAnswer({ questionId, userAnswer: answer }));
  }

  onTurnIn() {
    this.store.dispatch(setOefeningFinished());
    this.storage.save(this.state());
  }

  onClearOefening() {
    this.storage.clearStorage();
    this.store.dispatch(loadOefening());
    this.store.dispatch(clearOefening());
  }
}
