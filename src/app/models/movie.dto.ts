import { BaseDto } from './base.dto';
export interface MovieDto extends BaseDto {
  release_date: Date;
  title: string;
  similar: MovieDto[];
}
