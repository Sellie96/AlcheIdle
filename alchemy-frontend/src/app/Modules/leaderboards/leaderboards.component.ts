import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, startWith, switchMap, catchError, map } from 'rxjs';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { LeaderboardService } from './leaderboard.service';
import { Observable, of as observableOf } from 'rxjs';
import { skillLinks } from 'src/app/utils/utils';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent implements OnInit, AfterViewInit {
  leaderboardData?: any;

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'gamemode',
  ];

  dataSource:any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);

  skillTabs = skillLinks;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.leaderboardService!.getLeaderboard('Total').pipe(
            catchError(() => observableOf(null))
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.playerData.length;
          return data.playerData;
        })
      )
      .subscribe((data) =>  {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      });
  }

  getLeaderboard(filter: string) {
     merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.leaderboardService!.getLeaderboard(filter).pipe(
            catchError(() => observableOf(null))
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.playerData.length;
          return data.playerData;
        })
      )
      .subscribe((data) =>  {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      });
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.tab.textLabel);

    this.getLeaderboard(tabChangeEvent.tab.textLabel);
  };

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.lastIndexOf);
  }

  getTotalXp(data: any) {
    return (
      data.woodcutting.xpCurrent +
      data.mining.xpCurrent +
      data.fishing.xpCurrent +
      data.cooking.xpCurrent +
      data.firemaking.xpCurrent +
      data.runecrafting.xpCurrent +
      data.smithing.xpCurrent +
      data.thieving.xpCurrent +
      data.fletching.xpCurrent +
      data.crafting.xpCurrent +
      data.herblore.xpCurrent +
      data.agility.xpCurrent
    );
  }

  getTotalLevel(data: any) {
    return (
      data.woodcutting.level +
      data.mining.level +
      data.fishing.level +
      data.cooking.level +
      data.firemaking.level +
      data.runecrafting.level +
      data.smithing.level +
      data.thieving.level +
      data.fletching.level +
      data.crafting.level +
      data.herblore.level +
      data.agility.level
    );
  }
}
