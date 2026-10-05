import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideStore, Store } from '@ngrx/store';
import { oefeningReducer } from './oefening/store/oefening.reducer';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideStore({
          oefening: oefeningReducer,
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
