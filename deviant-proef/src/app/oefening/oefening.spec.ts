import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Oefening } from './oefening';
import { provideStore } from '@ngrx/store';
import { initialState, oefeningReducer } from './store/oefening.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectError,
  selectFinished,
  selectLoading,
  selectOefening,
  selectStarted,
} from './store/oefening.selectors';
import {
  clearOefening,
  loadOefening,
  setAnswer,
  setOefeningFinished,
  setOefeningStarted,
} from './store/oefening.actions';
import { OefeningStorage } from '../services/oefening-storage';

import { Oefening as OefeningModel } from './models/oefening.model';

const oefeningTest: OefeningModel = {
  name: 'Test oefening',
  introText: 'Dit is een test',
  questions: [
    {
      questionId: 1,
      question: 'Wat is 2 + 2?',
      questionType: 'multiple_choice',
      answers: [
        {
          answer: '3',
          answerId: 1,
          isCorrect: false,
        },
        {
          answer: '4',
          answerId: 2,
          isCorrect: true,
        },
      ],
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

describe('Oefening', () => {
  let component: Oefening;
  let fixture: ComponentFixture<Oefening>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oefening],
      providers: [
        provideStore({
          oefening: oefeningReducer,
        }),
        provideMockStore({
          initialState: {
            oefening: initialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Oefening);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading message while loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('De oefening wordt geladen');
  });

  it('should show error message while encountering an error', () => {
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, 'Er ging wat fout');
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Er ging wat fout');
  });

  it('should start the oefening when user clicks start button', () => {
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, null);
    store.overrideSelector(selectStarted, false);
    store.overrideSelector(selectFinished, false);
    store.overrideSelector(selectOefening, {
      name: 'Test oefening',
      introText: 'Dit is een test',
      questions: [],
      started: false,
      finished: false,
    });

    store.refreshState();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledWith(setOefeningStarted());
  });

  it('should dispatch setOefeningStarted', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.setStarted();

    expect(dispatchSpy).toHaveBeenCalledWith(setOefeningStarted());
  });

  it('should dispatch an answer for a multiple choice question', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.answerQuestion(1, 102);

    expect(dispatchSpy).toHaveBeenCalledWith(
      setAnswer({
        questionId: 1,
        userAnswer: 102,
      }),
    );
  });

  it('should dispatch an answer for an open question', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.answerQuestion(2, 'Ik vind de monarchie interessant.');

    expect(dispatchSpy).toHaveBeenCalledWith(
      setAnswer({
        questionId: 2,
        userAnswer: 'Ik vind de monarchie interessant.',
      }),
    );
  });

  it('should finish the exercise and save the state', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const storage = TestBed.inject(OefeningStorage);
    const saveSpy = vi.spyOn(storage, 'save');

    component.onTurnIn();

    expect(dispatchSpy).toHaveBeenCalledWith(setOefeningFinished());

    expect(saveSpy).toHaveBeenCalledWith(component.state());
  });

  it('should clear the exercise and reload it', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const storage = TestBed.inject(OefeningStorage);
    const clearSpy = vi.spyOn(storage, 'clearStorage');

    component.onClearOefening();

    expect(clearSpy).toHaveBeenCalled();

    expect(dispatchSpy).toHaveBeenCalledWith(loadOefening());

    expect(dispatchSpy).toHaveBeenCalledWith(clearOefening());
  });

  it('should render radio buttons and textareas', () => {
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, null);

    store.overrideSelector(selectOefening, oefeningTest);

    store.overrideSelector(selectStarted, true);

    store.refreshState();
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');

    expect(textarea).toBeTruthy();
    const radioButtons = fixture.nativeElement.querySelectorAll('input[type="radio"]');

    expect(radioButtons.length).toBe(2);
  });
});
