import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CharacterState } from '../state/character.state';
import { ChatService } from './chat.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayerData } from '../state/CharacterDataTypes';
import { Message } from './chat';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public users: number = 0;
  public messages!: Message[];
  message: FormControl;
  playerCharacter!: PlayerData;

  @ViewChildren("chatDiv") chatDiv!: QueryList<ElementRef>;

  constructor(
    private chatService: ChatService,
    private store: Store
  ) { 
    this.message = new FormControl('');
  }

  ngOnInit() {
    this.chatService.receiveChat().subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messages.reverse();
    });

    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });
  }

  ngAfterViewInit() {
    this.chatDiv.changes.subscribe(() => {
      this.chatDiv.first.nativeElement.scrollTop = 0;
    });
  }

  addChat(){
    if(this.message.value){
      this.chatService.sendChat(this.message.value, this.playerCharacter.username);
      this.message.setValue('');
    }
  }
}
