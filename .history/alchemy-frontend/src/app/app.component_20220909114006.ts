import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CharacterState, CharacterStateModel } from './stateManagement/character.state';
import { PlayerData } from './stateManagement/CharacterDataTypes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';


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

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!
        const url = event.urlAfterRedirects;
        this.title = url.substring(1);
      }
    });
  }
  ngOnInit(): void {
    this.getCharacters();
  }

  setTitle(title: string) {
    this.title = title;
  }

  async getCharacters() {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = { ...character };
    });
  }
}
