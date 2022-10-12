import { Action, createReducer, on } from '@ngrx/store';
import {
  getMoviesList,
  getMoviesListFailure,
  getMoviesListSuccess,
} from '../actions/movie.actions';
import { MovieDto } from '../models/movie.dto';
import { MoviesApiDto } from '../services/movie-db-api.service';

export interface MoviesState {
  movies: MoviesApiDto;
  movie: MovieDto;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: MoviesState = {
  movies: {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  },
  movie: {
    backdrop_path: '',
    genres: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    poster_path: '',
    vote_average: 0,
    vote_count: 0,
    release_date: new Date(),
    similar: [],
    title: '',
  },
  loading: false,
  loaded: false,
  error: null,
};

const _moviesReducer = createReducer(
  initialState,

  on(getMoviesList, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getMoviesListSuccess, (state, action) => ({
    ...state,
    movies: action.movies,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getMoviesListFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function moviesReducer(
  state: MoviesState | undefined,
  action: Action
): MoviesState {
  return _moviesReducer(state, action);
}
