import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers, EffectsArray } from './app.reducer';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { TvShowsListComponent } from './components/tv-shows-list/tv-shows-list.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { BadgeComponent } from './shared/components/badge/badge.component';
import { CardDetailComponent } from './shared/components/card-detail/card-detail.component';
import { CardComponent } from './shared/components/card/card.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ItemDetailComponent } from './shared/components/item-detail/item-detail.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
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
    ItemListComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EffectsArray),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
