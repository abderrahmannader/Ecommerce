import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  userToken:any ={ 
    token: localStorage.getItem('etoken') 

  } 

  AddToWishList(id:any):Observable<any>{

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers: this.userToken})
  }

  getWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:this.userToken})
  }

  removeWishList(id:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:this.userToken})
  }
}
