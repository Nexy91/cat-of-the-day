import { VoteModel } from '../shared/models/vote.interface';
import { APIService } from '../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cat-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  public votes: VoteModel[] = [];

  constructor(private _api: APIService, private _router: Router) { }

  ngOnInit(): void {
    this._api.getAllVotes().subscribe((votes: VoteModel[]) => {
      this.votes = votes.sort((a: VoteModel, b: VoteModel) => a.avg > b.avg ? 1 : 0);
    });
  }

  public navigateToCat(vote: VoteModel): void {
    this._router.navigate(['/rate'], { queryParams: { id: vote.id } });
  }
}