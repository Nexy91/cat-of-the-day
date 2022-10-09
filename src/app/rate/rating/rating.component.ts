import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Output() rated: EventEmitter<number> = new EventEmitter<number>();
  public currentRate: number;

  public reset(): void {
    this.currentRate = 0;
  }

  public publishRate(rate: number): void {
    this.currentRate = rate;
    this.rated.emit(rate);
  }
}
