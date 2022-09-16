import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  rememberMe = false;

  login: boolean = true;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(localStorage.getItem('username') || '', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      password: new FormControl(localStorage.getItem('password') || '', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', Validators.required),
      characterName: new FormControl('', Validators.required),
      characterAlignment: new FormControl('', Validators.required),
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  hasErrorRegister(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  submitLogin() {
    if (this.loginForm.valid) {
      if (this.rememberMe) {
        localStorage.setItem('username', this.loginForm.value.username);
        localStorage.setItem('password', this.loginForm.value.password);
      }
      if (this.loginForm.value) {
        this.accountService.login(this.loginForm.value);
      }
    }
  }

  submitRegistration() {
    if (this.registerForm.valid) {
      if (this.registerForm.value) {
        this.accountService.register(this.registerForm.value);
        this.login = true;
      }
    }
  }
}
