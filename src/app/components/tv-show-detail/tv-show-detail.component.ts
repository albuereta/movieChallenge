import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenreDto } from 'src/app/models/genre.dto';
import { MovieDbApiService } from 'src/app/services/movie-db-api.service';
import { CardDto } from 'src/app/shared/models/card.dto';
import { TvShowDto } from '../../models/tv-show.dto';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.scss'],
})
export class TvShowDetailComponent implements OnInit {
  tvShow: TvShowDto = {
    first_air_date: new Date(),
    last_air_date: new Date(),
    name: '',
    number_of_episodes: 0,
    number_of_seasons: 0,
    backdrop_path: '',
    genres: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    poster_path: '',
    vote_average: 0,
    vote_count: 0,
    similar: [],
  };

  similarTvShowsCards: CardDto[] = [];
  genresTvShows: GenreDto[] = [];
  genresTvShowDetail: string[] = [];

  constructor(
    private movieDbService: MovieDbApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    if (identifier) {
      this.tvShow = await this.movieDbService.getTvShowDetail(identifier);
      this.genresTvShows = await this.movieDbService.getTvShowsGenresList();

      this.genresTvShows.forEach((genre) => {
        if (this.tvShow.genres.find((g) => g.id === genre.id)) {
          this.genresTvShowDetail.push(genre.name);
        }
      });

      this.tvShow.similar.forEach((tvShow) => {
        this.similarTvShowsCards.push({
          date: new Date(tvShow.first_air_date),
          entityType: 'tvShow',
          id: tvShow.id,
          imgUrl:
            'https://image.tmdb.org/t/p/w220_and_h330_face/' +
            tvShow.poster_path,
          title: tvShow.name,
          votesValue: tvShow.vote_average,
        });
      });
    }
  }
}
