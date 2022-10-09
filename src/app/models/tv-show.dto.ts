import { BaseDto } from './base.dto';

export interface TvShowDto extends BaseDto {
  first_air_date: Date;
  last_air_date: Date;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  similar: TvShowDto[];
}
