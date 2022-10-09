import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Output() rated = new EventEmitter<number>();

  public currentRate: number;
  constructor() { }

  public reset() {
    this.currentRate = 0;
  }
}
