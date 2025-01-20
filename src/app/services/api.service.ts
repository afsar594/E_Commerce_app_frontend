import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private isLoggedIn = false;
  private baseUrl = 'https://localhost:44375/api'; // Your API base URL
  constructor(private http: HttpClient,   private router:Router
) { }
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
      return this.http.post<any>(`${this.baseUrl}/Users/authenticate`, User).pipe(
        tap((response: any) => {
          console.log('Server Response:', response);
          this.isLoggedIn = true;        })
      );
    }
    Register(User: any) {
      return this.http.post<any>(`${this.baseUrl}/Users`, User);
    }
    logout(): void {
      localStorage.removeItem('UserId');
    this.router.navigate(['']);
      this.isLoggedIn = false; // Reset the flag on logout
    }
  
    isAuthenticated(): boolean {
      return this.isLoggedIn; // Return the current login status
    }
}  
