import { Action, createReducer, on } from '@ngrx/store';
import {
  getMovieDetail,
  getMovieDetailFailre,
  getMovieDetailSuccess,
  getMoviesList,
  getMoviesListFailre,
  getMoviesListSuccess,
} from '../actions/item.actions';
import { ItemDto } from '../models/item.dto';

export interface ItemsState {
  items: ItemDto[];
  item: ItemDto;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ItemsState = {
  items: new Array<ItemDto>(),
  item: {
    backdropPath: '',
    genres: [],
    id: 0,
    originalLanguage: '',
    originalTitle: '',
    overview: '',
    posterPath: '',
    releaseDate: new Date(),
    similar: [],
    title: '',
    voteAverage: 0,
    voteCount: 0,
  },
  loading: false,
  loaded: false,
  error: null,
};

const _itemsReducer = createReducer(
  initialState,

  on(getMoviesList, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getMoviesListSuccess, (state, action) => ({
    ...state,
    items: action.items,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getMoviesListFailre, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getMovieDetail, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getMovieDetailSuccess, (state, action) => ({
    ...state,
    item: action.item,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getMovieDetailFailre, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function itemsReducer(
  state: ItemsState | undefined,
  action: Action
): ItemsState {
  return _itemsReducer(state, action);
}
