import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from './model/model.component';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit  {

  list: any
  filteredList: any;
  searchTerm: string = '';
  selectdValeu: any;
  selectdCategory: any;
  originalList: any;
  savedValue: any;
  UserId: any;
  getallBrandcategory: any;
constructor(
  public router:Router,
  public api:ApiService,
  public dialog: MatDialog,
  private Notification:ToastServiceService,

){
}
  ngOnInit(): void {
    this.UserId = localStorage.getItem('UserId');
    console.log(this.UserId); 
    this.getData()

      }
 
getData(){
  this.api.getAllItems().subscribe((res:any)=>{
    this.list=res
    this.originalList = [...res];
    this.savedValue= res
    console.log("res",res)
  })
}

filterList() {
  if (this.searchTerm.trim() === '') {
    this.list = [...this.originalList];
  } else {
    this.list = this.originalList.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
navigate(){
  this.router.navigate(['item' ]);
  this.list =  this.savedValue;
 this.searchTerm ='' 
}

openDialog(): void {
  const dialogRef = this.dialog.open(ModelComponent, {
    width: '450px', // Customize dialog width
  });

  // Capture the data returned from the dialog
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog closed with data:', result);
      // Handle the returned data here
      this.handleDialogData(result);
    } else {
      this.list =  this.savedValue;
      console.log('Dialog was closed without returning data');
    }
  });
}

// Handle the returned data from the dialog
handleDialogData(data: any) {
  if (data.oppo) {
     this.selectdValeu='oppo'
   this.getallbrands( this.selectdValeu)
  }  if (data.tecno) {
    this.selectdValeu='tecno'
    this.getallbrands( this.selectdValeu)
  }
 if (data.goldenMark) {
  this.selectdValeu='goldenMark'
  this.getallbrands( this.selectdValeu)
}
if (data.electronic) {
  this.selectdCategory='electronic'
  this.getallCategory(this.selectdCategory)
}
if (data.hardware) {
  this.selectdCategory='hardware'
 this.getallCategory(this.selectdCategory)
} 
}
getallbrands(value:any){
  this.api.getByBrand( value).subscribe((res)=>{
    this.list=res
  })
}
getallCategory(value:any){
  this.api.getByCategory( value).subscribe((res)=>{
    this.list=res
  })
}
view(data: any): void {
 // this.router.navigate(['item/detail'], { queryParams: data });
 const dataToPass = {data: data};
 this.router.navigate(['item/detail'], { state: dataToPass });
}
addToCart(data: any): void {
let payload={
    id: 0,
    name: data.name,
    price:data.price,
    description: data.description,
    brand: data?.brand,
    filePath: data.filePath,
    category:data?.category,
    totalPrice:data.price,
    userId: this.UserId,
    itemId:data.id,
    Qty:1

}
console.log("data",data,"paload",payload)
  this.api.saveItemAtCart(payload).subscribe((res)=>{
    if(res!=null){
      this.Notification.showNotification(res.message, 'Close');

    }
    console.log("data",res)
  })
}
// addToCart(data: any): void {
//   // Create a copy of the `data` object with `id` renamed to `itemId`
//   const updatedData = { ...data, itemId: data.id };
//   delete updatedData.id; // Remove the old `id` property if it exists
// console.log("data",updatedData)
//   // Call the API with the updated object
//   this.api.saveItemAtCart(updatedData).subscribe((res) => {
//     console.log('Response:', res);
//   });
// }


}
