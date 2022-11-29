import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, Observable } from 'rxjs';
import { ChatService } from './Modules/chat/chat.service';
import { CharacterState, CharacterStateModel } from './stateManagement/character/character.state';
import { PlayerData } from './stateManagement/character/CharacterDataTypes';
import { combatLinks, navLinkEnums, navLinks, skillLinks } from './utils/utils';
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
  loading = true;
  navLinks = navLinks;
  combatLinks = combatLinks;
  skillLinks = skillLinks;
  showChat = true;
  showHp = true;
  config = require('./config.json');
  

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private chatService: ChatService
  ) {
    this.router.events.subscribe(async (event) => {
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
          setTimeout(() => {
            this.loading = false;
         }, 500);
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

  hideHp() {
    this.showHp = !this.showHp
    const boxes = Array.from(
      document.getElementsByClassName('hp-box') as HTMLCollectionOf<HTMLElement>,
    );

    boxes.forEach(box => {
      if(box.style.visibility === 'visible') {
      box.style.visibility = 'hidden';
      } else {
        box.style.visibility = 'visible';
      }
    });

  }

  hideChat() {
    this.showChat = !this.showChat
    const boxes = Array.from(
      document.getElementsByClassName('chat-box') as HTMLCollectionOf<HTMLElement>,
    );

    boxes.forEach(box => {
      if(box.style.visibility === 'visible') {
      box.style.visibility = 'hidden';
      } else {
        box.style.visibility = 'visible';
      }
    });
  }

  changeChatLocation() {
    const boxes = Array.from(
      document.getElementsByClassName('chat-box') as HTMLCollectionOf<HTMLElement>,
    );

    boxes.forEach(box => {
      if(box.style.left === '0px') {
      box.style.left = '240px';
      } else {
        box.style.left = '0px';
      }
    });
  }

  getCorrectSkillLevel(skill: string) {
    switch (skill) {
      case navLinkEnums.woodcutting: return this.playerCharacter.character.skills.woodcutting.level;
      case navLinkEnums.mining: return this.playerCharacter.character.skills.mining.level;
      case navLinkEnums.fishing: return this.playerCharacter.character.skills.fishing.level;
      case navLinkEnums.cooking: return this.playerCharacter.character.skills.cooking.level;
      case navLinkEnums.firemaking: return this.playerCharacter.character.skills.firemaking.level;
      case navLinkEnums.smithing: return this.playerCharacter.character.skills.smithing.level;
      case navLinkEnums.crafting: return this.playerCharacter.character.skills.crafting.level;
      case navLinkEnums.runecrafting: return this.playerCharacter.character.skills.runecrafting.level;
      case navLinkEnums.thieving: return this.playerCharacter.character.skills.thieving.level;
      case navLinkEnums.fletching: return this.playerCharacter.character.skills.fletching.level;
      case navLinkEnums.herblore: return this.playerCharacter.character.skills.herblore.level;
      case navLinkEnums.agility: return this.playerCharacter.character.skills.agility.level;
      default: return -1;
    }
  }
}
