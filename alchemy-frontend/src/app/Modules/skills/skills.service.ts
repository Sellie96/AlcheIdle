import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from 'src/app/_services/account.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private socket: Socket, private accountService: AccountService) {}

  skillingActive(name: string, skill: any) {
    this.socket.emit('skillingActive', {
      username: name,
      type: skill,
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

  getSkillingUpdate() {
    return this.socket.fromOneTimeEvent('skillingActive');
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