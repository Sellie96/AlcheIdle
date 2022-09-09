import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    characterName: new FormControl(''),
    characterAlignment: new FormControl(''),
  });

  login: boolean = true;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  submitLogin() {
    if(this.loginForm.value){
      this.accountService.register(this.loginForm.value);
    }
  }

  submitRegistration() {
    if(this.registerForm.value){
      this.accountService.login(this.registerForm.value);
    }
  }

}
