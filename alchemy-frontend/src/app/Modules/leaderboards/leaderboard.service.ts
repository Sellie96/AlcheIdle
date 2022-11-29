import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  getLeaderboard(skill: string) {
   return this.httpClient.get<{playerData: PlayerData[]}>(`${this.baseUrl}/users/leaderboard?skill=${skill}`);
  }

}
