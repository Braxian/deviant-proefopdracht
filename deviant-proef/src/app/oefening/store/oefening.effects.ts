import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { loadOefening, loadOefeningFailure, loadOefeningSuccess } from './oefening.actions';
import { OefeningService } from '../../services/oefening-service';

@Injectable()
export class OefeningEffects {
  private actions$ = inject(Actions);
  private oefeningService = inject(OefeningService);

  loadOefening$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOefening),

      switchMap(() =>
        this.oefeningService.getOefening().pipe(
          map((oefening) => loadOefeningSuccess({ oefening })),

          catchError((error) =>
            of(
              loadOefeningFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
