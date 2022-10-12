import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardDto } from '../../models/card.dto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item: CardDto = {
    date: new Date(),
    entityType: '',
    id: 0,
    imgUrl: '',
    title: '',
    votesValue: 0,
  };

  constructor(private router: Router) {}

  navigate(): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() =>
        this.router.navigate(['/' + this.item.entityType, this.item.id])
      );
  }
}
