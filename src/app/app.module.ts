import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './Ethentication/register/register.component';
import { LoginComponent } from './Ethentication/login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './header/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailPageComponent } from './component/item-detail-page/item-detail-page.component';
import { ItemPageComponent } from './component/item-page.component';
import { ItemUploadFormComponent } from './component/item-upload-form/item-upload-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './component/loader/loader.component';
import { CartComponent } from './component/cart/cart.component';
import { LoaderInterceptor } from './services/loader.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PaymentComponent } from './component/payment/payment.component';
import { ModelComponent } from './component/model/model.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ItemPageComponent,
    ItemDetailPageComponent,
    ItemUploadFormComponent,
    LoaderComponent,
    CartComponent,
    PaymentComponent,
    ModelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule, // Required for ngx-toastr animations
    // ToastrModule.forRoot({   // Custom Toastr configuration
    //   timeOut: 3000,         // 3 seconds
    //   positionClass: 'toast-bottom-right', // Position
    //   preventDuplicates: true,  // Prevent duplicate toasts
    // })
    MatToolbarModule,
    FormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
