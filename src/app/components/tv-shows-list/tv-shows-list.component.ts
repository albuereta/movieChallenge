import { Component, OnInit } from '@angular/core';
import { ItemDto } from 'src/app/models/item.dto';
import { MovieDbApiService } from 'src/app/services/movie-db-api.service';
import { CardDto } from 'src/app/shared/models/card.dto';
import { CarouselDto } from 'src/app/shared/models/carousel.dto';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.scss'],
})
export class TvShowsListComponent implements OnInit {
  tvShows: ItemDto[];
  tvShowsTrends: ItemDto[];
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
        date: new Date(tvShow.releaseDate),
        entityType: 'tvShow',
        id: tvShow.id,
        imgUrl:
          'https://image.tmdb.org/t/p/w220_and_h330_face/' + tvShow.posterPath,
        title: tvShow.title,
        votesValue: tvShow.voteAverage,
      });
    });

    this.tvShowsTrends = await this.movieDbService.getTvShowsTrendsList();
    // 1) order by vote average
    // 2) return top 3 to carousel
    this.tvShowsTrends = this.tvShowsTrends
      .sort((a, b) => b.voteAverage - a.voteAverage)
      .slice(0, 3);

    this.tvShowsTrends.forEach((tvTrend) => {
      this.tvShowsTrendsCarousel.push({
        title: tvTrend.title,
        imgUrl: 'https://image.tmdb.org/t/p/w500/' + tvTrend.backdropPath,
        id: tvTrend.id,
        entityType: 'tvShow',
      });
    });
  }
}
