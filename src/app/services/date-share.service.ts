import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateShareService {

  private dataSource = new BehaviorSubject<any>(null); // Default value is null
  currentData = this.dataSource.asObservable(); // Make it observable for other components

  constructor() {

  }

  // Method to update the data
  updateData(data: any) {
    this.dataSource.next(data); // Update the value of BehaviorSubject
  }
}
