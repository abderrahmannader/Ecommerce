import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpassService } from 'src/app/services/forgetpass.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent {

  constructor(private _ForgetpassService:ForgetpassService, private _Router:Router, private _Renderer2:Renderer2){}

  step1:boolean = true
  step2:boolean =false
  step3:boolean = false
  alertColor:boolean = false

  errorMsg:string = ''

  userEmailMain:any

 

  

  


  forgetpassword:FormGroup = new FormGroup({
    email: new FormControl('')
  })


  CodeFromEmail:FormGroup = new FormGroup({
    resetCode: new FormControl('')
  })

  Resetpass:FormGroup = new FormGroup({
    newPassword: new FormControl('')
  })

  ForgetpasswordApi():void{

    let userEmail:any = this.forgetpassword.value
    
    this.userEmailMain = userEmail.email
    

    this._ForgetpassService.forgetPass(userEmail).subscribe({
      next:(respone)=>{
        console.log(respone)
        this.alertColor = true
        this.errorMsg = respone.message
        this.step1 = false
        this.step2 = true
        
       

      },
      error:(err)=>{
        console.log(err)
        this.alertColor = false
        this.errorMsg = err.error.message
        
      }
    })
    
    

  }

  EmailCodeApi():void{
    let userCode:FormGroup = this.CodeFromEmail.value

    this._ForgetpassService.emailCode(userCode).subscribe({
      next:(respone)=>{
        console.log(respone)
        this.alertColor = true
        this.errorMsg = respone.message
        this.step2 = false
        this.step3 = true
        

      },
      error:(err)=>{
        console.log(err)
        this.alertColor = false
        this.errorMsg = err.error.message
        
      }
    })

  }


  resetPasswordApi():void{

    let userNewPassword:any = this.Resetpass.value
    userNewPassword.email = this.userEmailMain
    console.log(userNewPassword)

    this._ForgetpassService.restpassword(userNewPassword).subscribe({
      next:(respone)=>{
        console.log(respone)
        this.errorMsg = respone.message
        this._Router.navigate(['/login'])

      },
      error:(err)=>{
        console.log(err)
        this.errorMsg = err.error.message
      }
    })

  }



  


}
