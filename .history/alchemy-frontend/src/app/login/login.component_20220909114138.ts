import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
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
