import { TestBed } from '@angular/core/testing';

import { LeaderboardsService } from './leaderboards.service';

describe('LeaderboardsService', () => {
  let service: LeaderboardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderboardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
