import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { ChatService } from './Modules/chat/chat.service';
import { CharacterState, CharacterStateModel } from './stateManagement/character/character.state';
import { PlayerData } from './stateManagement/character/CharacterDataTypes';
import { AccountService } from './_services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  player$: Observable<CharacterStateModel> = this.store.select(CharacterState);
  authenticated = false;
  login = true;
  title: string = 'Home';
  opened: boolean = true;
  playerCharacter!: PlayerData;
  users: number = 0;
  loading = false;

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private chatService: ChatService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!
        const url = event.urlAfterRedirects;
        this.title = url.substring(1);
      }

      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {

    this.chatService.getUsers().subscribe((users: any) => {
      this.users = users;
    });

    this.accountService.autoAuthUser();
    if (this.accountService.getIsAuth()) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    this.getCharacters();
  }

  setTitle(title: string) {
    this.title = title;
  }

  logout() {
    this.accountService.logout();
  }

  async getCharacters() {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = character;
      });
  }
}
