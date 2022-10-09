import { Component, Input } from '@angular/core';
import { CarouselDto } from '../../models/carousel.dto';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() items: CarouselDto[] = [];
  @Input() showIndicators: boolean = true;
  @Input() headerTitle: string = '';

  constructor() {}
}
