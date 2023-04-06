import { PlayerData } from './../../state/CharacterDataTypes';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CombatService {
  baseUrl = environment.apiUrl;

  constructor(private socket: Socket) { }

  startMonsterCombat(monsterId: String) {
    this.socket.emit('startMonsterCombat', {
      monsterId: monsterId
    });
  }

  flee() {
    this.socket.emit('flee');
  }

  monsterData() {
    return this.socket.fromEvent('fightResult');
  }

  playerData(): Observable<PlayerData> {
    return this.socket.fromEvent('getPlayerData');
  }

  getUpdatedPlayer(): Observable<PlayerData> {
    return this.socket.fromEvent('updatePlayer');
  }

  getUpdatedMonster(): Observable<any> {
    return this.socket.fromEvent('updateMonster');
  }

  getMonsterListData() {
    this.socket.emit('getMonsterListData');
    return this.socket.fromEvent('getMonsterListData');
  }
}