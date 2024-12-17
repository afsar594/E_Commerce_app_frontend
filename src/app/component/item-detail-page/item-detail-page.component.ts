import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.component.html',
  styleUrls: ['./item-detail-page.component.css']
})
export class ItemDetailPageComponent {
  Selecteditem: any;
  quantity: number = 1; // Initial quantity
  UserId: any;

  constructor(private route: ActivatedRoute,
    public router:Router,
    public api:ApiService,
    private Notification:ToastServiceService,
  ) {}

  ngOnInit(): void {
    // Access query parameters here
    // this.route.queryParams.subscribe(params => {
    //   console.log('Query Params:', params);
    let data = history.state; 
    this.Selecteditem=data.data
    console.log("recveing value",this.Selecteditem);
     //this.Selecteditem=params
     this.UserId = localStorage.getItem('UserId');
     console.log(this.UserId); 
   // });
  }
  payment(){
    this.router.navigate(['payment' ]);
  }
    // this.router.navigate(['cart'], { queryParams: data });
    addToCart(data: any): void {
      let payload={
          id: 0,
          name: data.name,
          price:data.price,
          description: data.description,
          brand: data?.brand,
          filePath: data.filePath,
          category:data?.category,
          totalPrice:data.price * this.quantity,
          userId:this.UserId,
          itemId:data.id,
          Qty:this.quantity
      }
        this.api.saveItemAtCart(payload).subscribe((res)=>{
          if(res!=null){
            this.Notification.showNotification(res.message, 'Close');
      
          }
        })
      }



  changeQuantity(amount: number): void {
    this.quantity += amount;
    this.Selecteditem['totalprice'] = this.quantity * this.Selecteditem['price'];
    console.log("Selecteditem",this.Selecteditem)
    if (this.quantity < 0) {
      this.quantity = 0;
    }
  }
  navigate(){
    this.router.navigate(['item' ]);
  }
}
