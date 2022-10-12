import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { TvShowsListComponent } from './components/tv-shows-list/tv-shows-list.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { CardDetailComponent } from './shared/components/card-detail/card-detail.component';
import { CardComponent } from './shared/components/card/card.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { BadgeComponent } from './shared/components/badge/badge.component';
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    TvShowsListComponent,
    TvShowDetailComponent,
    CardComponent,
    CarouselComponent,
    ProgressBarComponent,
    HeaderComponent,
    CardDetailComponent,
    SpinnerComponent,
    BadgeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
