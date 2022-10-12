import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDto } from '../models/genre.dto';
import { ItemDto } from '../models/item.dto';
import { MovieDto } from '../models/movie.dto';
import { TvShowDto } from '../models/tv-show.dto';

interface BaseApiDto {
  page: number;
  total_pages: number;
  total_results: number;
}

interface MoviesApiDto extends BaseApiDto {
  results: MovieDto[];
}

interface TvShowsApiDto extends BaseApiDto {
  results: TvShowDto[];
}

interface GenreApiDto {
  genres: GenreDto[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieDbApiService {
  private urlApi: string;
  private apikey = 'd578bd7221a9f868bf618675ab465165';

  constructor(private http: HttpClient) {
    this.urlApi = 'https://api.themoviedb.org/3/';
  }

  async getMoviesList(): Promise<ItemDto[]> {
    let result: ItemDto[] = [];
    const response = await this.http
      .get<MoviesApiDto>(
        this.urlApi +
          'movie/popular?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    response.results.forEach((movie) => {
      result.push({
        backdropPath: movie.backdrop_path,
        genres: [],
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        similar: [],
        title: movie.title,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      });
    });

    return result;
  }

  async getMoviesTrendsList(): Promise<ItemDto[]> {
    let result: ItemDto[] = [];
    const response = await this.http
      .get<MoviesApiDto>(
        this.urlApi +
          'trending/movie/week?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    response.results.forEach((movie) => {
      result.push({
        backdropPath: movie.backdrop_path,
        genres: [],
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        similar: [],
        title: movie.title,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      });
    });

    return result;
  }

  async getMovieDetail(movieId: string): Promise<MovieDto> {
    const result = await this.http
      .get<any>(
        this.urlApi +
          'movie/' +
          movieId +
          '?api_key=' +
          this.apikey +
          '&language=es&append_to_response=similar'
      )
      .toPromise();

    result.similar = result.similar.results;

    return result;
  }

  async getMoviesGenresList(): Promise<GenreDto[]> {
    const result = await this.http
      .get<GenreApiDto>(
        this.urlApi + 'genre/movie/list?api_key=' + this.apikey + '&language=es'
      )
      .toPromise();

    return result.genres;
  }

  async getTvShowsList(): Promise<ItemDto[]> {
    let result: ItemDto[] = [];
    const response = await this.http
      .get<TvShowsApiDto>(
        this.urlApi +
          'tv/popular?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    response.results.forEach((tvShow) => {
      result.push({
        backdropPath: tvShow.backdrop_path,
        genres: [],
        id: tvShow.id,
        originalLanguage: tvShow.original_language,
        originalTitle: tvShow.original_title,
        overview: tvShow.overview,
        posterPath: tvShow.poster_path,
        releaseDate: tvShow.first_air_date,
        similar: [],
        title: tvShow.name,
        voteAverage: tvShow.vote_average,
        voteCount: tvShow.vote_count,
      });
    });

    return result;
  }

  async getTvShowsTrendsList(): Promise<ItemDto[]> {
    let result: ItemDto[] = [];
    const response = await this.http
      .get<TvShowsApiDto>(
        this.urlApi +
          'trending/tv/week?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    response.results.forEach((tvShow) => {
      result.push({
        backdropPath: tvShow.backdrop_path,
        genres: [],
        id: tvShow.id,
        originalLanguage: tvShow.original_language,
        originalTitle: tvShow.original_title,
        overview: tvShow.overview,
        posterPath: tvShow.poster_path,
        releaseDate: tvShow.first_air_date,
        similar: [],
        title: tvShow.name,
        voteAverage: tvShow.vote_average,
        voteCount: tvShow.vote_count,
      });
    });

    return result;
  }

  async getTvShowDetail(tvShowId: string): Promise<TvShowDto> {
    const result = await this.http
      .get<any>(
        this.urlApi +
          'tv/' +
          tvShowId +
          '?api_key=' +
          this.apikey +
          '&language=es&append_to_response=similar'
      )
      .toPromise();

    result.similar = result.similar.results;

    return result;
  }

  async getTvShowsGenresList(): Promise<GenreDto[]> {
    const result = await this.http
      .get<GenreApiDto>(
        this.urlApi + 'genre/tv/list?api_key=' + this.apikey + '&language=es'
      )
      .toPromise();

    return result.genres;
  }
}
