import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  showReport:boolean=false
  list: Array<any> = [];

  billingForm:any;
  Selecteditem: any;
  bankDetails = {
    name: 'ABC Bank',
    accountNumber: '1234567890',
    ifsc: 'ABC123456',
    branch: 'Downtown Branch',
  };
  constructor(private route: ActivatedRoute,public router:Router,private fb: FormBuilder) {}
  ngOnInit(): void {
    let data = history.state; 
    this.Selecteditem=data.data
    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      nameOnCard: [''],
      address: [''],
      creditCardNo: [''],
      city: [''],
      expMonth: [''],
      state: [''],
      zipCode: [''],
      expYear: [''],
      cw: ['', ],
    });
  }  

  navigate(){
    this.router.navigate(['item' ]);
  }
  CheckOut() {
    debugger
    // Ensure the form is valid before proceeding
    if (this.billingForm.valid) {
      // Push the entire form value into the list
      this.list.push({
        name: this.billingForm.controls.name.value,
        email: this.billingForm.controls.email.value,
        address: this.billingForm.controls.address.value,
        state: this.billingForm.controls.state.value,
      });
  
      // Call the print report method
      this.printReport();
  
      // Log the updated list
    } else {
      console.log("Form is invalid. Please fill in all required fields.");
    }
  }
  
  printReport() {
    this.showReport=true
    const printContents = document.getElementById('print-section')!.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Refresh the page to restore the original content
  }
  calculateGrandTotal(): number {
    return this.Selecteditem.reduce((sum: any, item: { totalPrice: any; }) => sum + item.totalPrice, 0);
  }
  
}
