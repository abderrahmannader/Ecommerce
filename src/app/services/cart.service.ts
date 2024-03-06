import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  CartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  wishlistnNum:BehaviorSubject<number> = new BehaviorSubject(0)

  userToken:any ={ 
    token: localStorage.getItem('etoken') 

  } 


  AddProduct(id:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId: id},{headers:this.userToken})
  }

  getProduct():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:this.userToken})
  }

  removeProduct(id:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:this.userToken})
  }

  updateProduct(id:any,number:number):Observable<any>{

   
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:number},{headers:this.userToken})
  }

  clearAllProducts():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:this.userToken})
  }


  OrderPayment(CartId:any , UserData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`, {shippingAddress : UserData}, {headers:this.userToken})
  }

  getAllOrders(cartID:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartID}`)
  }
}
