import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'mail' },
    { title: 'Combat', url: '/combat', icon: 'paper-plane' },
    { title: 'Dungeons', url: '/dungeons', icon: 'heart' },
    { title: 'Raids', url: '/raids', icon: 'archive' },
    { title: 'Woodcutting', url: '/woodcutting', icon: 'trash' },
    { title: 'Leaderboards', url: '/leaderboards', icon: 'statistics' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
