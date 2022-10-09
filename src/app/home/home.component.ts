import { VoteModel } from '../shared/models/vote.interface';
import { APIService } from '../shared/services/api.service';
import { APPService } from '../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public randomImgId: number;
  public topRatedImgId: number;

  constructor(private _api: APIService, private _app: APPService) { }

  ngOnInit() {
    this._api.getAllVotes().subscribe((votes: VoteModel[]) => {
      if (votes.length) {
        let topVote = votes[0];
        votes.forEach((vote: VoteModel) => {
          if (vote.avg > topVote.avg) {
            topVote = vote;
          }
        });
        this.topRatedImgId = topVote.id;
        do { this.randomImgId = Math.floor(Math.random() * this._app.totalCats); }
        while (this.randomImgId === 0 || this.randomImgId === this.topRatedImgId);
      }
      else {
        do { this.randomImgId = Math.floor(Math.random() * this._app.totalCats); }
        while (this.randomImgId === 0);
        this.topRatedImgId = this._app.totalCats;
      }
    });
  }
}
