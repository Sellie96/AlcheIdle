import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdventureLog } from '../AdventureLog';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent implements OnInit, OnDestroy {
  messageArray: string[] = [];
  private _interval: any;
  playerItems: any = {
    health: 100,
    gold: 0,
    logs: 0,
    ore: 0,
    food: 0,
    water: 0,
    fish: 0,
    meat: 0,
    arrows: 0,
    gems: 0,
    diamonds: 0,
    jewels: 0,
  };
  adventureOutcomesPrefixPositive: AdventureLog[] = [
    {
      message: 'You found treasure! You gain',
      type: true,
      scenario: 'Treasure',
    },
    {
      message: 'You stumble upon a hidden stash! You gain',
      type: true,
      scenario: 'Treasure',
    },
    {
      message: 'You win a game of cards! You gain',
      type: true,
      scenario: 'Treasure',
    },
  ];

  adventureOutcomesPrefixNegative: AdventureLog[] = [
    {
      message: 'Uh Oh, you fell off a cliff you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'Mugged by bandits you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were eaten by a bear you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a goblin you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a troll you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a dragon you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a vampire you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a werewolf you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'You were attacked by a werebear you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'The innkeepers husband caught you in bed, you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'Got drunk and passed out, you lost',
      type: false,
      scenario: 'Treasure',
    },
    {
      message: 'Mugged in an alley, you lost',
      type: false,
      scenario: 'Treasure',
    },
  ];

  adventureOutcomesSuffix = [
    'health',
    'gold',
    'logs',
    'ore',
    'food',
    'water',
    'fish',
    'meat',
    'arrows',
    'gems',
    'diamonds',
    'jewels',
  ];

  constructor() {}

  ngOnDestroy() {
    clearInterval(this._interval);
  }

  ngOnInit(): void {
    this.startAdventure();
  }

  startAdventure() {
    this._interval = setInterval(async () => {
      let randomValue: boolean = this.calculateRandomChance(60);
      let changeInValue: number = Math.floor(Math.random() * 10);
      let prefix: string;

      if (randomValue) {
        prefix =
          this.adventureOutcomesPrefixPositive[
            Math.floor(
              Math.random() * this.adventureOutcomesPrefixPositive.length
            )
          ].message;
      } else {
        prefix =
          this.adventureOutcomesPrefixNegative[
            Math.floor(
              Math.random() * this.adventureOutcomesPrefixNegative.length
            )
          ].message;
      }

      let suffix: string =
        this.adventureOutcomesSuffix[
          Math.floor(Math.random() * this.adventureOutcomesSuffix.length)
        ];
      this.messageArray.push(this.stringBuilder(prefix, changeInValue, suffix));
      if (randomValue) {
        this.resolveResource(true, suffix, changeInValue);
      } else {
        this.resolveResource(false, suffix, changeInValue);
      }
    }, 4000);
  }

  resolveResource(isPositive: boolean, suffix: string, changeInValue: number) {
    if (isPositive) {
      switch (suffix) {
        case 'health':
          this.playerItems.health += changeInValue;
          break;
        case 'gold':
          this.playerItems.gold += changeInValue;
          break;
        case 'logs':
          this.playerItems.logs += changeInValue;
          break;
        case 'ore':
          this.playerItems.ore += changeInValue;
          break;
        case 'food':
          this.playerItems.food += changeInValue;
          break;
        case 'water':
          this.playerItems.water += changeInValue;
          break;
        case 'fish':
          this.playerItems.fish += changeInValue;
          break;
        case 'meat':
          this.playerItems.meat += changeInValue;
          break;
        case 'arrows':
          this.playerItems.arrows += changeInValue;
          break;
        case 'gems':
          this.playerItems.gems += changeInValue;
          break;
        case 'diamonds':
          this.playerItems.diamonds += changeInValue;
          break;
        case 'jewels':
          this.playerItems.jewels += changeInValue;
          break;
      }
    } else {
      switch (suffix) {
        case 'health':
          this.playerItems.health -= changeInValue;
          break;
        case 'gold':
          this.playerItems.gold -= changeInValue;
          break;
        case 'logs':
          this.playerItems.logs -= changeInValue;
          break;
        case 'ore':
          this.playerItems.ore -= changeInValue;
          break;
        case 'food':
          this.playerItems.food -= changeInValue;
          break;
        case 'water':
          this.playerItems.water -= changeInValue;
          break;
        case 'fish':
          this.playerItems.fish -= changeInValue;
          break;
        case 'meat':
          this.playerItems.meat -= changeInValue;
          break;
        case 'arrows':
          this.playerItems.arrows -= changeInValue;
          break;
        case 'gems':
          this.playerItems.gems -= changeInValue;
          break;
        case 'diamonds':
          this.playerItems.diamonds -= changeInValue;
          break;
        case 'jewels':
          this.playerItems.jewels -= changeInValue;
          break;
      }
    }
  }

  stringBuilder(prefixMessage: string, prop2: any, messageSuffix: string) {
    return `${prefixMessage} ${prop2} ${messageSuffix}`;
  }

  calculateRandomChance(chanceInPercentage: string | number) {
    return chanceInPercentage > Math.random() * 100;
  }
}
