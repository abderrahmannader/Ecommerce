import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BrandsComponent } from './component/brands/brands.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { NavbarAuthComponent } from './navbar-auth/navbar-auth.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './component/details/details.component';
import {RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './component/payment/payment.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ForgetpassComponent } from './component/forgetpass/forgetpass.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { SearchPipe } from './pipe/search.pipe';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { AllordersComponent } from './component/allorders/allorders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthlayoutComponent,
    HomelayoutComponent,
    NavbarAuthComponent,
    NotFoundComponent,
    DetailsComponent,
    PaymentComponent,
    ForgetpassComponent,
    SearchPipe,
    WishlistComponent,
    AllordersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    
    
    
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
