import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { AccountService } from './account/Account.service';
import { CharacterState } from './state/character.state';
import { PlayerData } from './state/CharacterDataTypes';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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

  loading = false;
  showChat = false;

  playerCharacter!: PlayerData;

  constructor(
    private accountService: AccountService,
    private store: Store,
    private router: Router
    ) {
    }

  ngOnInit() {
    this.accountService.autoAuthUser();
    if (this.accountService.getIsAuth()) {
      this.loggedIn = true;
      this.router.navigate(['app/Town/Main']);
      this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(take(1))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = character;
      }).unsubscribe();
    } else {
      this.router.navigate(['']);
      this.loggedIn = false;
    }
  }

  openChat() {
    this.showChat = !this.showChat;
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}
