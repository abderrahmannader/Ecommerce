import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private _AuthServiceService:AuthServiceService, private _CartService:CartService, private _Renderer2:Renderer2, private _WishlistService:WishlistService){}

  cartNum:number = 0
  wishlistnNum:number = 0


  ngOnInit(): void {


    this._CartService.getProduct().subscribe({
      next:(response) => {
        this.cartNum = response.numOfCartItems
      }
    })

    this._CartService.CartNumber.subscribe({
      next:(response) =>{
        this.cartNum = response

      }
    })

    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        this.wishlistnNum = response.data.length
      }
    })


   this._CartService.wishlistnNum.subscribe({
    next:(response)=>{
      this.wishlistnNum = response
    }
   })
  }






  logout():void{
    this._AuthServiceService.Logoutservice()
  }

  @ViewChild('navbar')navelement!:ElementRef
  
  @HostListener('window:scroll')
  onscroll():void{
    if(scrollY > 200){
      this._Renderer2.addClass(this.navelement.nativeElement, 'py-3')
    }else{
      this._Renderer2.removeClass(this.navelement.nativeElement, 'py-3')
    }
  }
}
