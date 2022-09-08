import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users: number = 0;
  public messages: any[] = [];
  message: FormControl;

  @ViewChildren("chatDiv") chatDiv!: QueryList<ElementRef>;

  constructor(
    private chatService: ChatService
  ) { 
    this.message = new FormControl('');
  }

  ngOnInit() {

    this.chatService.getUsers().subscribe((users: any) => {
      this.users = users;
    });


    this.chatService.receiveChat().subscribe((messages: any) => {
      this.messages = messages;
      this.messages.reverse();
    });
  }

  ngAfterViewInit() {
    this.chatDiv.changes.subscribe(() => {
      this.chatDiv.first.nativeElement.scrollTop = 0;
    });
  }

  addChat(){
    if(this.message.value){
      this.chatService.sendChat(this.message.value);
      this.message.setValue('');
    }
  }
}