import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './leaderboards.component';


@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  getLeaderboard(skill: string) {
    return this.httpClient.get<{playerData: any[]}>(`${this.baseUrl}/users/leaderboard?skill=${skill}`)
    .toPromise()
    .then(res => {
      if (res!.playerData) {
        return res!.playerData;
      } else {
        throw new Error('Response does not contain playerData');
      }
    });
  }
}
