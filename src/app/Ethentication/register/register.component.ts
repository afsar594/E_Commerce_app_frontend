import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
fg:any
constructor(
  public api:ApiService,
  private Notification:ToastServiceService,
  private router:Router,
){


}
  ngOnInit(): void {
    this.fg= new FormGroup({
      Id:new FormControl(null),
      Email: new FormControl(null,[Validators.required]),
      Password: new FormControl(null,[Validators.required]),
      RepeatPassword: new FormControl(null,[Validators.required]),
    })
  }
  get f() {
    return this.fg.controls;
  }
register(){
  if (this.fg.valid) {
    const loginData = this.fg.value;

    this.api.Register(loginData).subscribe(
      (res: any) => {
        if (res!=null) {
          this.Notification.showNotification(res.email || 'Register successful', 'Close');

          this.router.navigate(['']);
        } else {
          this.Notification.showNotification(res?.error?.email || 'Register failed. Please try again.', 'Close');
        }
        console.log('Register response:', res);
      },
      (error) => {
        console.error('Register error:', error);
        this.Notification.showNotification('An error occurred during login. Please try again.', 'Close');
      }
    );

    console.log('Register data:', loginData);
  } else {
    // Notify user about invalid form inputs
    this.Notification.showNotification('Please fill out the form correctly.', 'Close');
  }
}
}
