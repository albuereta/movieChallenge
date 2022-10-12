import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CardDto } from '../../models/card.dto';
import { CarouselDto } from '../../models/carousel.dto';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0.2,
        })
      ),
      transition('void <=> *', animate(1500)),
    ]),
  ],
})
export class ItemListComponent implements OnInit {
  @Input() carouselTitle: string = '';
  @Input() carouselItems: CarouselDto[] = [];
  @Input() listItemsTitle: string = '';
  @Input() listItems: CardDto[] = [];

  constructor() {}

  ngOnInit(): void {}
}
