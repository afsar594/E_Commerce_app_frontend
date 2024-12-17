import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private route: ActivatedRoute,public router:Router) {}

  navigate(){
    this.router.navigate(['item' ]);
  }
}
