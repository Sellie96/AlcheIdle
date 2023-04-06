import { AccountService } from './../../account/Account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', Validators.required),
    characterName: new FormControl('', Validators.required),
    characterAlignment: new FormControl('', Validators.required),
  });

  constructor(private accountService: AccountService) { }

  ngOnInit() {}

  hasErrorRegister(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  submitRegistration() {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value);
    }
  }
}
