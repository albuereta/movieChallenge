import { GenreDto } from './genre.dto';

export interface ItemDto {
  backdropPath: string;
  genres: GenreDto[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  releaseDate: Date;
  similar: ItemDto[];
  title: string;
  voteAverage: number;
  voteCount: number;
}
