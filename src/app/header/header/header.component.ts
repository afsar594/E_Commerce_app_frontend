import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DateShareService } from 'src/app/services/date-share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemCount=10
  receivedData: any;

  constructor(private dataService: DateShareService,private api:ApiService,
  ) {}

  ngOnInit() {
    // Subscribe to the currentData observable to get the updated data
    this.dataService.currentData.subscribe(data => {
      this.receivedData = data; // Update receivedData when data changes
    });
  }
  logout(){
    this.api.logout()
  }
}
