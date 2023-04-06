import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { LeaderboardsService } from './leaderboards.service';

export interface LeaderboardData {
  level: number;
  mode: string;
  name: string;
  ranking: number;
  xp: number;
}

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent implements OnInit {

    data: LeaderboardData[] = [];

    ColumnMode = ColumnMode;

    rows: LeaderboardData[] = [];
    
    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private leaderboardService: LeaderboardsService) { }

    ngOnInit() {
        this.setSearch();
    }

    setSearch(searchBy: string = 'Woodcutting') {
      this.leaderboardService.getLeaderboard(searchBy).then(data => {
        this.data = data.map((item) => {
          return {
            ...item,
            mode: item.mode.charAt(0).toUpperCase() + item.mode.slice(1),
          };
        });

          this.loading = false;
          this.rows = this.data;
      });
    }

    updateFilter(event: any) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.data.filter(function (d: any) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.rows = temp;
    }
}
