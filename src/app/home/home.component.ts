import { VoteModel } from '../shared/models/vote.interface';
import { APIService } from '../shared/services/api.service';
import { APPService } from '../shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public randomImgId: number;
  public topRatedImgId: number;

  constructor(private _api: APIService, private _app: APPService, private _router: Router) { }

  ngOnInit(): void {
    this._api.getAllVotes().subscribe((votes: VoteModel[]) => {
      if (votes.length) {
        this.topRatedImgId = (votes.reduce((max: VoteModel, current: VoteModel) => max.avg > current.avg ? max : current)).id;
      } this.randomImgId = this._app.getRandomCat(this.topRatedImgId);
    }, () => { this._router.navigate(['server-down']); });
  }
}
