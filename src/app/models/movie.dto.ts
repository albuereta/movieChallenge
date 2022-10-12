import { BaseDto } from './base.dto';
export interface MovieDto extends BaseDto {
  release_date: Date;
  similar: MovieDto[];
  title: string;
}
