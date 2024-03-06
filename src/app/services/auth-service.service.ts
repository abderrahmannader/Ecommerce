import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient:HttpClient , private _router:Router) { }


  datasaver:any

  dataDecode():void{

    if(localStorage.getItem('etoken') != null){
      let tokenCode:any = localStorage.getItem('etoken')
      let tokenDecode:any = jwtDecode(tokenCode)
      this.datasaver = tokenDecode
      console.log(this.datasaver)
      localStorage.setItem('UserID', this.datasaver.id)
    }
  }


  Logoutservice():void{
    localStorage.removeItem('etoken')
    this._router.navigate(['/login'])
    
  }


  registerfunction(userdata:object):Observable<any>{

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userdata)
  

  }


  loginfunction(userdata:object):Observable<any>{

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userdata)

  }
  
}
