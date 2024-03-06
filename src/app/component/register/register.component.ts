import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthServiceService:AuthServiceService, private _Router:Router){}

  registerform:FormGroup = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(14)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    phone: new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

  },{validators:[this.repasswordConfirm]} as FormControlOptions)

  repasswordConfirm(group:FormGroup):void{
    const password = group.get('password')
    const rePassword = group.get('rePassword')

    if(rePassword?.value == ''){
      rePassword.setErrors({require:true})
    }else if(rePassword?.value != password?.value){

      rePassword?.setErrors({notsame:true})


    }
  }

  spin:boolean = false
  errormesg:string = ''

  handelform(){
    console.log(this.registerform.get("name")?.getError('minlength'))
    this.spin = true

    if(this.registerform.valid === true){

      

      this._AuthServiceService.registerfunction(this.registerform.value).subscribe({
        next:(response) =>{

          if(response.message === "success"){
            console.log(response)
            this._Router.navigate(['/login'])
            this.spin = false
          }

        },
        error:(err) =>{
          console.log(err)
          this.errormesg = err.error.message
          this.spin = false

        }
      })

      

    }

    
    
  }
}
