import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService, private _Renderer2:Renderer2, private _CartService:CartService, private _ToastrService:ToastrService){}

  WishList:any = []


  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        this.WishList = response.data
        console.log(this.WishList)
      }
    })
  }



  RemoveItems(id:any,btnelem:HTMLButtonElement):void{

    this._Renderer2.setAttribute(btnelem, 'disabled', 'true')

    this._WishlistService.removeWishList(id).subscribe({
      next:(response)=>{
        console.log('deleted',response)
        this._Renderer2.removeAttribute(btnelem, 'disabled')
        this._ToastrService.success(response.message)
        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
            this.WishList = response.data
            this._CartService.wishlistnNum.next(response.data.length)
            
          }
        })
      
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(btnelem, 'disabled')

      }
    })

  }

  addProducts(prodId:any, addbtn:HTMLButtonElement):void{

    this._Renderer2.setAttribute(addbtn, 'disabled', 'true')

    this._CartService.AddProduct(prodId).subscribe({
      next:(response) =>{
        console.log(response)
        this._CartService.CartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(addbtn,'disabled')
        this._Renderer2.setAttribute(addbtn, 'disabled', 'true')
        this._WishlistService.removeWishList(prodId).subscribe({
          next:(response)=>{
            console.log('deleted',response)
            this._Renderer2.removeAttribute(addbtn, 'disabled')
            this._WishlistService.getWishList().subscribe({
              next:(response)=>{
                this.WishList = response.data
                this._CartService.wishlistnNum.next(response.data.length)
              }
            })
          
          },
          error:(err)=>{
            this._Renderer2.removeAttribute(addbtn, 'disabled')
    
          }
        })

      },

      error:(err) =>{
        this._Renderer2.removeAttribute(addbtn,'disabled')
      }
    })
  }






}
