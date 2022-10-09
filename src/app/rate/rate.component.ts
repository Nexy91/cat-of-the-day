import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingComponent } from './rating/rating.component';
import { APIService } from '../shared/services/api.service';
import { VoteModel } from '../shared/models/vote.interface';
import { APPService } from '../shared/services/app.service';
import { CatModel } from '../shared/models/cat.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: 'cat-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @ViewChild(RatingComponent, { static: false }) rating: RatingComponent;

  public countdown: number = 3; // Max number of seconds when the user can change his decision
  public editMode: boolean; // The moment when the user can change his decision
  public countdown$: Observable<number>;
  public cat: CatModel;

  constructor(private _api: APIService, private _app: APPService, private _route: ActivatedRoute) { }

  ngOnInit() {
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

  public rateCat(rate: number) {
    this.cat.rate = rate;

    if (!this.editMode) {
      this.editMode = true;

      this.countdown$.subscribe((seconds: number) => {
        if (seconds === 0) {
          this._api.getVote(this.cat.id).subscribe((vote: VoteModel) => {
            // Update
            vote.count++;
            vote.sum = vote.sum + this.cat.rate;
            vote.avg = vote.sum / vote.count;
            this._api.updateVote(vote).subscribe((x: any) => {
              this.swipeToNextCat();
            });

          }, (error: any) => {
            // Create new
            let newVote: VoteModel = {
              id: this.cat.id,
              sum: this.cat.rate,
              avg: this.cat.rate,
              count: 1
            };
            this._api.postVote(newVote).subscribe((x: any) => {
              this.swipeToNextCat();
            });
          });
        }
      });
    }
  }

  private swipeToNextCat() {
    if (this.rating) { this.rating.reset(); }
    this.editMode = false;

    let previousCat: number = this.cat ? this.cat.id : -1;
    let nextCat: number;

    do { nextCat = Math.floor(Math.random() * this._app.totalCats); }
    while (nextCat === 0 || previousCat == nextCat);

    this.cat = {
      rate: 0,
      id: nextCat,
      url: `../../assets/${nextCat}.gif`
    }
  }
}
