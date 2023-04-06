import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../account/Account.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(localStorage.getItem('username') || '', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    password: new FormControl(localStorage.getItem('password') || '', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  
  rememberMe = false;

  login = true;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  submitLogin() {
    if (this.loginForm.valid) {
      if (this.rememberMe) {
        localStorage.setItem('username', this.loginForm.value.username);
        localStorage.setItem('password', this.loginForm.value.password);
      }
      this.accountService.login(this.loginForm.value);
    }
  }
}
