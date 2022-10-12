import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GenreDto } from '../models/genre.dto';
import { ItemDto } from '../models/item.dto';

export const getMoviesList = createAction('Get movies list');
export const getMoviesListSuccess = createAction(
  'Get movies list success',
  props<{ items: ItemDto[] }>()
);
export const getMoviesListFailre = createAction(
  'Get movies list failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getMovieDetail = createAction(
  'Get movie detail',
  props<{ itemId: number }>()
);
export const getMovieDetailSuccess = createAction(
  'Get movie detail success',
  props<{ item: ItemDto }>()
);
export const getMovieDetailFailre = createAction(
  'Get movie detail failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getMoviesGenres = createAction('Get movies genres');
export const getMoviesGenresSuccess = createAction(
  'Get movies genres success',
  props<{ genres: GenreDto[] }>()
);
export const getMoviesGenresFailure = createAction(
  'Get movies genres failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getTvShowsList = createAction('Get tv shows list');
export const getTvShowsListSuccess = createAction(
  'Get tv shows list success',
  props<{ items: ItemDto[] }>()
);
export const getTvShowsListFailre = createAction(
  'Get tv shows list failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getTvShowDetail = createAction(
  'Get tv show detail',
  props<{ itemId: number }>()
);
export const getTvShowDetailSuccess = createAction(
  'Get tv show detail success',
  props<{ item: ItemDto }>()
);
export const getTvShowFailre = createAction(
  'Get tv show detail failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getTvShowsGenres = createAction('Get tv shows genres');
export const getTvShowsGenresSuccess = createAction(
  'Get tv shows genres success',
  props<{ genres: GenreDto[] }>()
);
export const getTvShowsGenresFailure = createAction(
  'Get tv shows genres failure',
  props<{ payload: HttpErrorResponse }>()
);
