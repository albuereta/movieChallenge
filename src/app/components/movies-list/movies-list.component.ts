import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ItemDto } from 'src/app/models/item.dto';
import { CardDto } from 'src/app/shared/models/card.dto';
import { CarouselDto } from 'src/app/shared/models/carousel.dto';
import * as MoviesActions from '../../actions';
import { MovieDbApiService } from '../../services/movie-db-api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: ItemDto[];
  moviesTrends: ItemDto[];
  title: string;
  moviesCards: CardDto[];
  moviesTrendsCarousel: CarouselDto[];
  headerCarouselTitle: string = 'Top 3 movies in trend this week';

  constructor(
    private movieDbService: MovieDbApiService,
    private store: Store<AppState>
  ) {
    this.movies = [];
    this.moviesTrends = [];
    this.title = 'Popular movies';
    this.moviesCards = [];
    this.moviesTrendsCarousel = [];

    this.store.select('movies').subscribe((movies) => {
      movies.movies.results.forEach((movie) => {
        this.movies.push({
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

        this.moviesCards.push({
          date: new Date(movie.release_date),
          entityType: 'movie',
          id: movie.id,
          imgUrl:
            'https://image.tmdb.org/t/p/w220_and_h330_face/' +
            movie.poster_path,
          title: movie.original_title,
          votesValue: movie.vote_average,
        });
      });
    });
  }

  async ngOnInit(): Promise<void> {
    // this.movies = await this.movieDbService.getMoviesList();

    this.store.dispatch(MoviesActions.getMoviesList());

    this.moviesTrends = await this.movieDbService.getMoviesTrendsList();
    // 1) order by vote average
    // 2) return top 3 to carousel
    this.moviesTrends = this.moviesTrends
      .sort((a, b) => b.voteAverage - a.voteAverage)
      .slice(0, 3);

    this.moviesTrends.forEach((movieTrend) => {
      this.moviesTrendsCarousel.push({
        title: movieTrend.originalTitle,
        imgUrl: 'https://image.tmdb.org/t/p/w500/' + movieTrend.backdropPath,
        id: movieTrend.id,
        entityType: 'movie',
      });
    });
  }
}
