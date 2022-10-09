import { interval, Observable, Subject } from "rxjs";
import { map, startWith, take, takeUntil } from "rxjs/operators";
import { RatingModel } from '../shared/models/rating.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingComponent } from './rating/rating.component';
import { APIService } from '../shared/services/api.service';
import { VoteModel } from '../shared/models/vote.interface';
import { APPService } from '../shared/services/app.service';
import { CatModel } from '../shared/models/cat.interface';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'cat-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  // This can also be done with an input element, but I wanted to show knowledge of viewChild through this example
  @ViewChild(RatingComponent, { static: false }) rating: RatingComponent;

  public countdown: number = 3; // Max number of seconds when the user can change his decision
  public editMode: boolean; // The moment when the user can change his decision
  public currentRate: RatingModel;
  public cat: CatModel;

  public countdown$: Observable<number>;
  public unsubscribe$ = new Subject();

  constructor(private _api: APIService, private _app: APPService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countdown$ = interval(1000).pipe(take(this.countdown + 1), map(count => this.countdown - count));
    this._route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.cat = {
          rate: 0,
          id: params.id,
          url: `../../assets/${params.id}.gif`
        }
      } else { this.swipeToNextCat(); }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public rateCat(rate: RatingModel): void {
    this.currentRate = rate;
    this.cat.rate = this.currentRate.rate;

    if (!this.editMode) {
      this.editMode = true;
      this.countdown$.pipe(takeUntil(this.unsubscribe$)).subscribe((seconds: number) => {
        if (seconds === 0) {
          this.currentRate = {} as RatingModel;
          this._api.getVote(this.cat.id).subscribe((vote: VoteModel) => {
            // Update
            vote.count++;
            vote.sum = vote.sum + this.cat.rate;
            vote.avg = vote.sum / vote.count;
            this._api.updateVote(vote).subscribe(() => {
              this.swipeToNextCat();
            });

          }, () => {
            // Create new
            let newVote: VoteModel = {
              count: 1,
              id: this.cat.id,
              sum: this.cat.rate,
              avg: this.cat.rate
            };
            this._api.postVote(newVote).subscribe(() => {
              this.swipeToNextCat();
            });
          });
        }
      });
    }
  }
  private swipeToNextCat(): void {
    if (this.rating) { this.rating.reset(); }
    this.editMode = false;

    const previousCat: number = this.cat ? this.cat.id : -1;
    const randomCat = this._app.getRandomCat(previousCat);

    this.cat = {
      rate: 0,
      id: randomCat,
      url: `../../assets/${randomCat}.gif`
    }
  }
}
