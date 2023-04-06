import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { AccountService } from './account/Account.service';
import { CharacterState } from './state/character.state';
import { PlayerData } from './state/CharacterDataTypes';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn = false;
  loginForm = false;
  showLanding = true;

  playerCharacter!: PlayerData;

  constructor(
    private accountService: AccountService,
    private store: Store
    ) {}

  ngOnInit() {
    this.accountService.autoAuthUser();
    if (this.accountService.getIsAuth()) {
      this.loggedIn = true;
      this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = character;
      });
    } else {
      this.loggedIn = false;
    }
  }

  public appPages = [
    { title: 'Town', url: '/app/Town/Store', icon: 'mail', gold: true },
    { title: 'Adventure', url: '/app/Combat/Fighting', icon: 'paper-plane', level: true },
    // { title: 'Dungeons', url: '/app/Dungeons/Dungeon', icon: 'heart' },
    { title: 'Raids', url: '/app/Raids/Raiding', icon: 'archive' },
    { title: 'Backpack', url: '/app/Backpack/Inventory', icon: 'trash', inventory: true },
    // { title: 'Equipment', url: '/app/Equipment/Loadout', icon: 'accessibility' },
    { title: 'Leaderboard', url: '/app/Leaderboards/Statistics', icon: 'stats-chart' },
  ];

  public skills = [
    { title: 'Alchemy', url: '/app/Alchemy/Alching', icon: 'mail' },
    { title: 'Woodcutting', url: '/app/Woodcutting/Chopping', icon: 'paper-plane' },
    { title: 'Fishing', url: '/app/Fishing/Fish', icon: 'archive' },
    { title: 'Firemaking', url: '/app/Firemaking/Firemaking', icon: 'trash' },
    { title: 'Cooking', url: '/app/Cooking/Cook', icon: 'stats-chart' },
    { title: 'Runecrafting', url: '/app/Runecrafting/Runecraft', icon: 'stats-chart' },
    { title: 'Mining', url: '/app/Mining/Mine', icon: 'stats-chart' },
    { title: 'Thieving', url: '/app/Thieving/Pickpocket', icon: 'stats-chart' },
    { title: 'Agility', url: '/app/Agility/Course', icon: 'stats-chart' },
    
  ];

  signOut() {
    this.accountService.logout();
    this.loggedIn = false;
  }


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
