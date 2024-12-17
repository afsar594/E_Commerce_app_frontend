import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any

  constructor(private fb: FormBuilder,
              public api:ApiService,
              private Notification:ToastServiceService,
              private router:Router,
            ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  //, Validators.email]
  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      this.api.Login(loginData).subscribe(
        (res: any) => {
          if (res?.userDetail?.valid) {
            localStorage.setItem('UserId', res?.userDetail?.user.id);
            // Show success notification
            this.Notification.showNotification(res.userDetail?.label || 'Login successful', 'Close');
  
            // Navigate to the desired route
            this.router.navigate(['/item']);
          } else {
            // Show error notification
            this.Notification.showNotification(res?.error?.label || 'Login failed. Please try again.', 'Close');
          }
  
          console.log('Login response:', res);
        },
        (error) => {
          // Handle API error
          console.error('Login error:', error);
          this.Notification.showNotification('An error occurred during login. Please try again.', 'Close');
        }
      );
  
      console.log('Login data:', loginData);
    } else {
      // Notify user about invalid form inputs
      this.Notification.showNotification('Please fill out the form correctly.', 'Close');
    }
  }
  
  
}
