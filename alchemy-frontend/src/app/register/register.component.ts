import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../_services/account.service';

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

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  submitRegistration() {
    if(this.registerForm.value){
      this.accountService.register(this.registerForm.value);
    }
  }

}
