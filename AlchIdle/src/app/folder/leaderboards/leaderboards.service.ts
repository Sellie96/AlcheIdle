import { ToastService } from './../../utils/toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastService
    ) { }


  getLeaderboard(skill: string = 'Woodcutting') {
    return this.httpClient.get<{playerData: any[]}>(`${this.baseUrl}/users/leaderboard?skill=${skill}`)
    .toPromise()
    .then(res => {
      if (res) {
        console.log(res);
        return res.playerData;
      } else {
        this.toastr.getErrorToast("Failed to fetch leaderboard")
        throw new Error('Response does not contain playerData');
      }
    });
  }
}
