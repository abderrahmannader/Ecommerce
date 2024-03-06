import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService, private _CartService:CartService, private _ToastrService:ToastrService, private _Renderer2:Renderer2, private _WishlistService:WishlistService){}

  products:any[] = []
  categories:any[] = []
  term:string = ''
  wishListData:any[] = []

  ngOnInit(): void {

    this._EcomdataService.getproducts().subscribe({
      next:(response) =>{
        this.products = response.data
        console.log(response)
        
      }
    })

    this._EcomdataService.getAllCategory().subscribe({
      next:(response) =>{
        console.log(response.data)
        this.categories = response.data

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:2000,
    
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

}
