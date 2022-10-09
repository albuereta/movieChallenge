import { Component, OnInit } from '@angular/core';
import { MovieDbApiService } from 'src/app/services/movie-db-api.service';
import { CardDto } from 'src/app/shared/models/card.dto';
import { CarouselDto } from 'src/app/shared/models/carousel.dto';
import { TvShowDto } from '../../models/tv-show.dto';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.scss'],
})
export class TvShowsListComponent implements OnInit {
  tvShows: TvShowDto[];
  tvShowsTrends: TvShowDto[];
  title: string;
  tvShowsCards: CardDto[];
  tvShowsTrendsCarousel: CarouselDto[];
  headerCarouselTitle: string = 'Top 3 tv shows in trend this week';

  constructor(private movieDbService: MovieDbApiService) {
    this.tvShows = [];
    this.tvShowsTrends = [];
    this.title = 'Popular tv shows';
    this.tvShowsCards = [];
    this.tvShowsTrendsCarousel = [];
  }

  async ngOnInit(): Promise<void> {
    this.tvShows = await this.movieDbService.getTvShowsList();

    this.tvShows.forEach((tvShow) => {
      this.tvShowsCards.push({
        date: new Date(tvShow.first_air_date),
        entityType: 'tvShow',
        id: tvShow.id,
        imgUrl:
          'https://image.tmdb.org/t/p/w220_and_h330_face/' + tvShow.poster_path,
        title: tvShow.name,
        votesValue: tvShow.vote_average,
      });
    });

    this.tvShowsTrends = await this.movieDbService.getTvShowsTrendsList();
    // 1) order by vote average
    // 2) return top 3 to carousel
    this.tvShowsTrends = this.tvShowsTrends
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 3);

    this.tvShowsTrends.forEach((tvTrend) => {
      this.tvShowsTrendsCarousel.push({
        title: tvTrend.name,
        imgUrl: 'https://image.tmdb.org/t/p/w500/' + tvTrend.backdrop_path,
        id: tvTrend.id,
        entityType: 'tvShow',
      });
    });
  }
}
