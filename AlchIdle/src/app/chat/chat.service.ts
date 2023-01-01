import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {}

  sendChat(message: string, name: string){
    this.socket.emit('createMessage', {name: name, message: message, date: new Date().toISOString().split("T")[1].split(".")[0]});
  }

  receiveChat(){
    return this.socket.fromEvent('findAllMessages');
  }

  getUsers(){
    return this.socket.fromEvent('users');
  }

  sendSkillUpdate(message: string){
    this.socket.emit('createMessage', {name: "Server", message: message, date: new Date().toISOString().split("T")[1].split(".")[0]});
  }

}