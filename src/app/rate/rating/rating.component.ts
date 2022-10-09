import { RatingModel } from 'src/app/shared/models/rating.interface';
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Output() rated: EventEmitter<RatingModel> = new EventEmitter<RatingModel>();
  public currentRate: number;
  public rating: RatingModel[] = [
    {
      rate: 1,
      description: 'Bad'
    },
    {
      rate: 2,
      description: 'So-so'
    },
    {
      rate: 3,
      description: 'Cool'
    },
    {
      rate: 4,
      description: 'Top!'
    },
    {
      rate: 5,
      description: 'The best!'
    }
  ]
  public reset(): void {
    this.currentRate = 0;
  }
  public publishRate(x: RatingModel): void {
    this.currentRate = x.rate;
    this.rated.emit(x);
  }
}