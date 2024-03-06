import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService:CartService){}

cartID:any
AllOrders:any
ispaid:boolean = false
paid:string = 'NotPaid'


  ngOnInit(): void {

  

    this.cartID = localStorage.getItem('UserID')

    this._CartService.getAllOrders(this.cartID).subscribe({
      next:(response)=>{
        console.log(response)
        console.log(this.cartID)
        this.AllOrders = response 
        
      }
    })

    
  }
}
