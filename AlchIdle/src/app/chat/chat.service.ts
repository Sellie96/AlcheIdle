import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './chat';

enum Sockets {
  create = 'createMessage',
  getMessages = 'findAllMessages',
  getUsers = 'users'
  }

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {}

  sendChat(message: string, name: string){
    this.socket.emit(Sockets.create, {name: name, message: message, date: new Date().toISOString().split("T")[1].split(".")[0]});
  }

  receiveChat(): Observable<Message[]>{
    return this.socket.fromEvent(Sockets.getMessages);
  }

  getUsers(): Observable<number>{
    return this.socket.fromEvent(Sockets.getUsers);
  }

  sendSkillUpdate(message: string){
    this.socket.emit(Sockets.create, {name: "Server", message: message, date: new Date().toISOString().split("T")[1].split(".")[0]});
  }

}