import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as MoviesActions from '../actions';
import { MovieDbApiService } from '../services/movie-db-api.service';

@Injectable()
export class MoviesEffects {
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private itemsService: MovieDbApiService
  ) {}

  getMoviesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMoviesList),
      exhaustMap(() =>
        this.itemsService.getMoviesList().pipe(
          map((movies) => {
            return MoviesActions.getMoviesListSuccess({
              movies: movies,
            });
          }),
          catchError((error) => {
            return of(MoviesActions.getMoviesListFailure({ payload: error }));
          })
        )
      )
    )
  );

  getMoviesListFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.getMoviesListFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );
}
