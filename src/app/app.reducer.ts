import { ActionReducerMap } from '@ngrx/store';
import { MoviesEffects } from './effects/movie.effects';
import * as MoviesReducer from './reducers';

export interface AppState {
  movies: MoviesReducer.MoviesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  movies: MoviesReducer.moviesReducer,
};

export const EffectsArray: any[] = [MoviesEffects];
