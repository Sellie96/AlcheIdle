import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    characterName: new FormControl(''),
    characterAlignment: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submitRegistration() {
    if(this.registerForm.value){
      this.chatService.sendChat(this.message.value);
      this.message.setValue('');
    }
  }

}
