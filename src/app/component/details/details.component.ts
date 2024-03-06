import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  constructor( private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService, private _Renderer2:Renderer2, private _CartService:CartService , private _ToastrService:ToastrService, private _WishlistService:WishlistService){
  }

  productId:any 

  productDetails:any
  wishListData:any[] = []

    ngOnInit():void{

      this._ActivatedRoute.paramMap.subscribe({
        next:(parm) =>{
          this.productId = parm.get('id')
          console.log(parm)
        }
      })

      this._EcomdataService.getDetailsProoduct(this.productId).subscribe({
        next:(response) =>{

          this.productDetails = response.data

        }
      })

      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
          console.log(response)
          const newdata = response.data.map((item:any)=>item._id)
          this.wishListData = newdata
          
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
        },
  
        error:(err) =>{
          this._Renderer2.removeAttribute(addbtn,'disabled')
        }
      })
    }

    addWishList(id:any):void{
      console.log(id)
      if(this.wishListData.includes(id)){
    
        this._WishlistService.removeWishList(id).subscribe({
          next:(response)=>{
            this.wishListData = response.data
            this._CartService.wishlistnNum.next(response.data.length)
            this._ToastrService.success(response.message)
          }
        })
    
      }else{
        this._WishlistService.AddToWishList(id).subscribe({
          next:(response)=>{
            console.log(response)
            this.wishListData = response.data
            this._CartService.wishlistnNum.next(response.data.length)
            this._ToastrService.success(response.message)
          }
        })
      }
      
    
    
    }

}
