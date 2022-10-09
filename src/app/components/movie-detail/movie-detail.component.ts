import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDbApiService } from 'src/app/services/movie-db-api.service';
import { CardDto } from 'src/app/shared/models/card.dto';
import { MovieDto } from '../../models/movie.dto';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDto = {
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    poster_path: '',
    release_date: new Date(),
    title: '',
    vote_average: 0,
    vote_count: 0,
    similar: [],
  };

  similarMoviesCards: CardDto[] = [];

  constructor(
    private movieDbService: MovieDbApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    if (identifier) {
      this.movie = await this.movieDbService.getMovieDetail(identifier);

      this.movie.similar.forEach((movie) => {
        this.similarMoviesCards.push({
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
    }
  }
}
