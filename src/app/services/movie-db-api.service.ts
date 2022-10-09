import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDto } from '../models/genre.dto';
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

  async getMoviesList(): Promise<MovieDto[]> {
    const result = await this.http
      .get<MoviesApiDto>(
        this.urlApi +
          'movie/popular?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    return result.results;
  }

  async getMoviesTrendsList(): Promise<MovieDto[]> {
    const result = await this.http
      .get<MoviesApiDto>(
        this.urlApi +
          'trending/movie/week?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    return result.results;
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

  async getTvShowsList(): Promise<TvShowDto[]> {
    const result = await this.http
      .get<TvShowsApiDto>(
        this.urlApi +
          'tv/popular?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    return result.results;
  }

  async getTvShowsTrendsList(): Promise<TvShowDto[]> {
    const result = await this.http
      .get<TvShowsApiDto>(
        this.urlApi +
          'trending/tv/week?api_key=' +
          this.apikey +
          '&language=es&page=1'
      )
      .toPromise();

    return result.results;
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
