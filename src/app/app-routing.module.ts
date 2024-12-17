import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Ethentication/login/login.component';
import { RegisterComponent } from './Ethentication/register/register.component';
import { ItemPageComponent } from './component/item-page.component';
import { ItemDetailPageComponent } from './component/item-detail-page/item-detail-page.component';
import { ItemUploadFormComponent } from './component/item-upload-form/item-upload-form.component';
import { CartComponent } from './component/cart/cart.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ModelComponent } from './component/model/model.component';

const routes: Routes = [
  {
    path:'',component: LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'item',component:ItemPageComponent
  },
  {
    path:'item/detail',component:ItemDetailPageComponent
  },
  {
    path:'item/upload',component:ItemUploadFormComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'payment',component:PaymentComponent
  },
  {
    path:'model',component:ModelComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
