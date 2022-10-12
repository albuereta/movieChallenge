import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { TvShowsListComponent } from './components/tv-shows-list/tv-shows-list.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesListComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'tvShows',
    component: TvShowsListComponent,
  },
  {
    path: 'tvShow/:id',
    component: TvShowDetailComponent,
  },
  {
    path: '**',
    component: MoviesListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
