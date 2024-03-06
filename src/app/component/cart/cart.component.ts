import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService, private _Renderer2:Renderer2){}

  products:any = null
  numberOfItems:number = 0
  totalPrice:number = 0
  NotFound:boolean = true
  cartId:any

  ngOnInit(): void {
    this._CartService.getProduct().subscribe({
      next:(response) =>{
        console.log(response)
        this.products = response.data.products
        this.numberOfItems = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this.cartId = response.data._id
      },
      error:(err) =>{
        console.log(err)
        if(err.status === 404){
          this.NotFound = false
        }
      }
    })
  }
  
  RemoveItems(id:any,btnelem:HTMLButtonElement):void{
    this._Renderer2.setAttribute(btnelem, 'disabled', 'true')

    this._CartService.removeProduct(id).subscribe({
      next:(response) =>{
        console.log(response)
        this.numberOfItems = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this._CartService.CartNumber.next(response.numOfCartItems)
        this.products = response.data.products
        this._Renderer2.removeAttribute(btnelem, 'disabled')
      },
      error:(err) =>{
        this._Renderer2.removeAttribute(btnelem, 'disabled')
      }
    })
  }

  updateItems(prodId:any, num:number ,btnelem1:HTMLButtonElement,btnelem2:HTMLButtonElement ):void{

    this._Renderer2.setAttribute(btnelem1, 'disabled', 'true')
    this._Renderer2.setAttribute(btnelem2, 'disabled', 'true')

    if(num >= 1){
      this._CartService.updateProduct(prodId, num).subscribe({
        next:(response) =>{
          this.numberOfItems = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
          this.products = response.data.products
          this._CartService.CartNumber.next(response.numOfCartItems)
          this._Renderer2.removeAttribute(btnelem1, 'disabled')
          this._Renderer2.removeAttribute(btnelem2, 'disabled')
        },
        error:(err) =>{
          this._Renderer2.removeAttribute(btnelem1, 'disabled')
          this._Renderer2.removeAttribute(btnelem2, 'disabled')

        }
      })
    }else{
      this._Renderer2.removeAttribute(btnelem1, 'disabled')
          this._Renderer2.removeAttribute(btnelem2, 'disabled')
    }

    

  }


  clearAll(clear:HTMLButtonElement):void{

    this._Renderer2.setAttribute(clear, 'disabled','true')
    this._CartService.clearAllProducts().subscribe({
      next:(response) =>{
        console.log(response)

        this._Renderer2.removeAttribute(clear, 'disabled')

        if(response.message == "success"){
          this.products = null
          this.numberOfItems = 0
          this.totalPrice = 0
          this._CartService.CartNumber.next(0)
        }
        
      },
      error:(err) =>{
        this._Renderer2.removeAttribute(clear, 'disabled')
      }
    })
  }

}
