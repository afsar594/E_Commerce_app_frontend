import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DateShareService } from 'src/app/services/date-share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  showReport:boolean=false
  Selecteditem: any;
  list:any
  totalPrice: any;
   DataArray: any[] = [];
  UserId: any;
  constructor(private route: ActivatedRoute, 
     public router:Router,
     public api:ApiService,
     public datashare:DateShareService
  ) {}

  ngOnInit(): void {
    this.UserId = localStorage.getItem('UserId');
    console.log(this.UserId); 
    
    // Initialize the list if it hasn't been already
    this.list = this.list || []; // Ensure it's an array
  
    // Access query parameters here
    this.route.queryParams.subscribe(params => {
      this.Selecteditem = { ...params }; // Create a copy of params
      this.list.push(this.Selecteditem); // Push the copied object into the array

    });
   this.getAllItemFromCArt()
  }
  payment(){
    this.showReport=true
    // this.router.navigate(['payment' ]);
    const dataToPass = {data: this.list};
    this.router.navigate(['payment'], { state: dataToPass });
  }
  BacktoItem(){
    this.router.navigate(['item' ]);
  }
  getAllItemFromCArt(){
    this.api.getAllItemsFromCART().subscribe((res)=>{
      if (Array.isArray(res) && this.UserId != null) {
        this.list = res.filter(item => item.userId === Number(this.UserId));
    } else {
    }
    
       this.totalPrice = this.list.reduce((sum: any, item: { totalPrice: any; }) => sum + item.totalPrice, 0);
      this.datashare.updateData(this.list.length)
    })
  }
  
//   onCheckboxChange(rowData: any) {
//     if (rowData.selected) {
//       this.api.deleteItemFromCart(rowData.id).subscribe((res)=>{
//         if(res!=null){
//          this.getAllItemFromCArt()
//         }
//       })
//     } else {
//       console.log('Row deselected:', rowData);
//     }
// }
onCheckboxChange(rowData: any) {
  if (rowData.selected) {
      if (!this.DataArray.includes(rowData.id)) {
         this.DataArray.push(rowData.id);
      }
    
  } else {
     this.DataArray = this.DataArray.filter(id => id !== rowData.id);
  }
   }
   delete() {
    const confirmed = window.confirm("Are you sure you want to delete the selected items?");
    if (confirmed) {
      this.api.deleteItemFromCart(this.DataArray).subscribe((res) => {
        if (res != null) {
          this.getAllItemFromCArt();
        }
      });
    }
  }
  incrementQty(item: any): void {
    item.qty++;
    this.updateTotalPrice(item);
  }
  
  decrementQty(item: any): void {
    if (item.qty > 1) { // Prevent quantity from going below 1
      item.qty--;
      this.updateTotalPrice(item);
    }
  }
  
  updateTotalPrice(item: any): void {
    item.totalPrice = item.qty * item.price;
    this.calculateOrderTotal();
  }
  
  calculateOrderTotal(): void {
    this.totalPrice = this.list.reduce((sum: any, item: { totalPrice: any; }) => sum + item.totalPrice, 0);
  }
 
  
}
