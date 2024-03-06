import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BrandsComponent } from './component/brands/brands.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { authGuard } from './guard/auth.guard';
import { DetailsComponent } from './component/details/details.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ForgetpassComponent } from './component/forgetpass/forgetpass.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { AllordersComponent } from './component/allorders/allorders.component';

const routes: Routes = [
  

  {path:'', component:HomelayoutComponent,canActivate:[authGuard] , children:[

  {path:'' , redirectTo:'home', pathMatch:'full'},
  {path:'home' , component:HomeComponent, title:'home'},
  {path:'cart' , component:CartComponent, title:'cart'},
  {path:"products" , component:ProductsComponent, title:'products'},
  {path:"categories" , component:CategoriesComponent, title:'categories'},
  {path:"brands" , component:BrandsComponent, title:'brands'},
  {path:'details/:id' , component:DetailsComponent, title:'details'},
  {path:'payment/:id', component:PaymentComponent,title:'payment'},
  {path:'wishlist',component:WishlistComponent,title:'WishList'},
  {path:'allorders',component:AllordersComponent,title:'AllOrders'}

  ]},


  {path:'', component:AuthlayoutComponent, children:[

  {path:"login" , component:LoginComponent, title:'login'},
  {path:"register" , component:RegisterComponent, title:'register'},
  {path:"forgetpass", component:ForgetpassComponent, title:'forgetPass'}

  ]},
  
  
  {path:"**" , component:NotFoundComponent, title:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
