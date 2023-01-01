import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { LeaderboardsService } from './leaderboards.service';


export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: any;
  status?: string;
  representative?: Representative;
}

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent implements OnInit {

    data!: any[];

    ColumnMode = ColumnMode;

    rows: any[] = [];
    columns: any[] = [];
    


    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private leaderboardService: LeaderboardsService) { }

    ngOnInit() {
        this.leaderboardService.getLeaderboard("Woodcutting").then(data => {
            this.data = data;
            this.loading = false;
            this.rows = this.data;
            console.log(this.rows);
        });
    }
}
