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
  private maxTop: number = 50; // Show just first x images of top rated cats
  public votes: VoteModel[] = [];
  public noVotes = false;

  constructor(private _api: APIService, private _router: Router) { }

  ngOnInit(): void {
    this._api.getAllVotes().subscribe((votes: VoteModel[]) => {
      this.votes = votes.sort((a: VoteModel, b: VoteModel) => a.avg < b.avg ? 1 : -1);

      if (this.votes.length > this.maxTop) {
        this.votes = this.votes.slice(0, this.maxTop);
      }
      this.noVotes = this.votes.length ? false : true;
    }, () => { this.noVotes = true; });
  }
  public navigateToCat(vote: VoteModel): void {
    this._router.navigate(['/rate'], { queryParams: { id: vote.id } });
  }
}