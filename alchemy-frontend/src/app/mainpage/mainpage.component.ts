import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  title: string = 'Home';
  opened: boolean = true;

  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!  
        const url = event.urlAfterRedirects;
        this.title = url.substring(1);
      }
    })
  }

  ngOnInit(): void {
  }

}
