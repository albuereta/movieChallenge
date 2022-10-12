import { Component, OnInit } from '@angular/core';
import { ItemDto } from 'src/app/models/item.dto';
import { CardDto } from 'src/app/shared/models/card.dto';
import { CarouselDto } from 'src/app/shared/models/carousel.dto';
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
        date: new Date(movie.releaseDate),
        entityType: 'movie',
        id: movie.id,
        imgUrl:
          'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.posterPath,
        title: movie.originalTitle,
        votesValue: movie.voteAverage,
      });
    });

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
