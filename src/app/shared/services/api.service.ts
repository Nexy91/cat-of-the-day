import { VoteModel } from '../models/vote.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class APIService {
  public api: string = 'http://localhost:3000';
  constructor(private _http: HttpClient) { }

  public getAllVotes(): Observable<VoteModel[]> {
    return this._http.get<VoteModel[]>(`${this.api}/votes`);
  }

  public getVote(id: number): Observable<VoteModel> {
    return this._http.get<VoteModel>(`${this.api}/votes/${id}`);
  }

  public postVote(vote: VoteModel): any {
    return this._http.post<any>(`${this.api}/votes`, vote);
  }

  public updateVote(vote: VoteModel): any {
    return this._http.put<any>(`${this.api}/votes/${vote.id}`, vote);
  }
}