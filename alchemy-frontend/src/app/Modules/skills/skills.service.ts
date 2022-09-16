import { HostListener, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from 'src/app/_services/account.service';
import { Tree } from './woodcutting/Trees';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private socket: Socket, private accountService: AccountService) {}

  woodcuttingActive(name: string, tree: Tree){
    this.socket.emit('woodcuttingActive', {
      username: name, 
      treeType: tree,
      time: new Date().toISOString().split("T")[1].split(".")[0],
      jwt: this.accountService.getToken()
    });
  }

  getPlayerData(){
    return this.socket.fromEvent('getWoodcuttingPlayerData');
  }

  receiveChat(){
    return this.socket.fromEvent('findAllMessages');
  }

  getWoodcutters(){
    return this.socket.fromEvent('woodcuttingUsers');
  }

  sendSkillUpdate(message: string){
    this.socket.emit('createMessage', {
      name: "Server",
      message: message
    });
  }

}