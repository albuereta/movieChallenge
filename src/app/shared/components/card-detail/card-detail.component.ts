import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent {
  @Input() title: string = '';
  @Input() date: Date = new Date();
  @Input() genres: string = '';
  @Input() overview: string = '';

  constructor() {}
}
