import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44375/api'; // Your API base URL
  constructor(private http: HttpClient) { }
//localhost:44375/api/Items/SaveItem
  // Method to get all items
  getAllItems() {
    return this.http.get(`${this.baseUrl}/Items`);
    }
    getBrandcategory() {
      return this.http.get(`${this.baseUrl}/Items/category-brand`);
      }
  // Method to save an item
  saveItem(item: any) {
    return this.http.post(`${this.baseUrl}/Items/SaveItem`, item);
  }
  getByBrand(value: any) {
    return this.http.get(`${this.baseUrl}/Items/by-brand/${value}`);
  }
  getByCategory(value: any) {
    return this.http.get(`${this.baseUrl}/Items/by-category/${value}`);
  }
  saveItemAtCart(item: any) {
    return this.http.post<any>(`${this.baseUrl}/Cart/SaveItemAtCart`, item);
  }
  getAllItemsFromCART() {
    return this.http.get(`${this.baseUrl}/Cart`);
    }
    deleteItemFromCart(payload: any) {
      return this.http.delete(`${this.baseUrl}/Cart`, {
        body: payload,
      });
    }
    
    Login(User: any) {
      return this.http.post<any>(`${this.baseUrl}/Users/authenticate`, User);
    }
    Register(User: any) {
      return this.http.post<any>(`${this.baseUrl}/Users`, User);
    }
}  
