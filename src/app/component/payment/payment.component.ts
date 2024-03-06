import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private _CartService:CartService, private _ActivatedRoute:ActivatedRoute){}

  cartId:any 

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(parms) =>{
        this.cartId = parms.get('id')
        
      }
    })
    
  }

  OrderDetails:FormGroup = new FormGroup({

    details: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)])

  })

  CheckOut():void{

    let backEndDetails:Object = this.OrderDetails.value

    if(this.OrderDetails.valid === true){

      this._CartService.OrderPayment(this.cartId,backEndDetails).subscribe({
        next:(response) =>{
          console.log(response)
          window.open(response.session.url,'_blank')
        }
      })

    }

  

  }



}
