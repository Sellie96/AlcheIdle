import { AccountService } from './../../account/Account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})
export class TownComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {}

  signOut() {
    this.accountService.logout();
    window.location.reload();
  }

}
