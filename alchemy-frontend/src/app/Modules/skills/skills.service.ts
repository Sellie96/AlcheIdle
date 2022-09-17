import { HostListener, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from 'src/app/_services/account.service';
import { Thieving } from './thieving/Thieving';
import { Tree } from './woodcutting/Trees';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private socket: Socket, private accountService: AccountService) {}

  woodcuttingActive(name: string, tree: Tree) {
    this.socket.emit('woodcuttingActive', {
      username: name,
      treeType: tree,
      jwt: this.accountService.getToken(),
      timestamp: new Date().toISOString().split('T')[1].split('.')[0],
    });
  }

  thievingActive(name: string, thievingTarget: Thieving) {
    this.socket.emit('thievingActive', {
      username: name,
      thievingOption: thievingTarget,
      jwt: this.accountService.getToken(),
      timestamp: new Date().toISOString().split('T')[1].split('.')[0],
    });
  }

  getPlayerData() {
    return this.socket.fromOneTimeEvent('getWoodcuttingPlayerData');
  }

  receiveChat() {
    return this.socket.fromEvent('findAllMessages');
  }

  getWoodcutters() {
    return this.socket.fromEvent('woodcuttingUsers');
  }

  getWoodcuttingUpdate() {
    return this.socket.fromOneTimeEvent('woodcuttingActive');
  }

  getThiefs() {
    return this.socket.fromEvent('thievingUsers');
  }

  getThievingUpdate() {
    return this.socket.fromOneTimeEvent('thievingActive');
  }

  closeSocket() {
    this.socket.disconnect();
  }

  sendSkillUpdate(message: string) {
    this.socket.emit('createMessage', {
      name: 'Server',
      message: message,
    });
  }
}
