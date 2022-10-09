import { GenreDto } from './genre.dto';

export interface BaseDto {
  backdrop_path: string;
  genres: GenreDto[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
