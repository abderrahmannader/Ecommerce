import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { EcomdataService } from 'src/app/services/ecomdata.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private _EcomdataService:EcomdataService, private _CartService:CartService, private _ToastrService:ToastrService, private _Renderer2:Renderer2){}

  term:string = '';
  products:any[] = []
  categories:any[] = []
  pageSize:number = 0
  currentP:number = 1
  total:number = 0
  

  ngOnInit(): void {

    this._EcomdataService.getproducts().subscribe({
      next:(response) =>{
        this.products = response.data
        this.pageSize = response.metadata.limit
      this.currentP = response.metadata.currentPage
      this.total = response.results
        
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

pageChanged(event:any):void{
  this._EcomdataService.getproducts(event).subscribe({
    next:(response)=>{
      this.products = response.data
      this.pageSize = response.metadata.limit
      this.currentP = response.metadata.currentPage
      this.total = response.results

    }
  })
}

}
