import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() value: number = 0;
  valuePercentage: string = '';
  valuePercentageLabel: string = '';
  colorClass: string = 'regular';
  constructor() {}

  ngOnInit(): void {
    let tempValue = this.value * 10;
    let tempValuetoString = tempValue.toFixed(0);

    this.valuePercentageLabel = tempValuetoString + '%';
    this.valuePercentage = 'width: ' + this.valuePercentageLabel;

    if (this.value * 10 > 50) {
      this.colorClass = 'good';
    }
    if (this.value * 10 > 70) {
      this.colorClass = 'top';
    }
  }
}
