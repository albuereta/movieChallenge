import { Component, OnInit } from '@angular/core';
import { MovieDto } from 'src/app/models/movie.dto';
import { CardDto } from 'src/app/shared/models/card.dto';
import { CarouselDto } from 'src/app/shared/models/carousel.dto';
import { MovieDbApiService } from '../../services/movie-db-api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: MovieDto[];
  moviesTrends: MovieDto[];
  title: string;
  moviesCards: CardDto[];
  moviesTrendsCarousel: CarouselDto[];
  headerCarouselTitle: string = 'Top 3 movies in trend this week';

  constructor(private movieDbService: MovieDbApiService) {
    this.movies = [];
    this.moviesTrends = [];
    this.title = 'Popular movies';
    this.moviesCards = [];
    this.moviesTrendsCarousel = [];
  }

  async ngOnInit(): Promise<void> {
    this.movies = await this.movieDbService.getMoviesList();

    this.movies.forEach((movie) => {
      this.moviesCards.push({
        date: new Date(movie.release_date),
        entityType: 'movie',
        id: movie.id,
        imgUrl:
          'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path,
        title: movie.original_title,
        votesValue: movie.vote_average,
      });
    });

    this.moviesTrends = await this.movieDbService.getMoviesTrendsList();
    // 1) order by vote average
    // 2) return top 3 to carousel
    this.moviesTrends = this.moviesTrends
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 3);

    this.moviesTrends.forEach((movieTrend) => {
      this.moviesTrendsCarousel.push({
        title: movieTrend.original_title,
        imgUrl: 'https://image.tmdb.org/t/p/w500/' + movieTrend.backdrop_path,
      });
    });
  }
}
