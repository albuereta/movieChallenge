import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { MoviesApiDto } from '../services/movie-db-api.service';

export const getMoviesList = createAction('Get movies list');
export const getMoviesListSuccess = createAction(
  'Get movies list success',
  props<{ movies: MoviesApiDto }>()
);
export const getMoviesListFailure = createAction(
  'Get movies list failure',
  props<{ payload: HttpErrorResponse }>()
);
