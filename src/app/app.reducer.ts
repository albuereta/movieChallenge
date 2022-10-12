import { ActionReducerMap } from '@ngrx/store';
import * as ItemReducer from './reducers';

export interface AppState {
  items: ItemReducer.ItemsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  items: ItemReducer.itemsReducer,
};

export const EffectsArray: any[] = [
  /*
  AuthEffects,
  UserEffects,
  CategoriesEffects,
  PostsEffects,
  */
];
