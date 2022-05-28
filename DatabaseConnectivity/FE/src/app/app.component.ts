import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PublishEventService } from './core/services/utils/publish-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fdbApp';

  constructor(private router: Router, private location:Location,private eventService: PublishEventService) {
  }


}
