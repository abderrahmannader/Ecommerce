import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthServiceService:AuthServiceService, private _Router:Router){
  }

  loginform:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  spin:boolean = false
  errormesg:string = ''

  handelform(){
    this.spin = true

    if(this.loginform.valid == true){

      this._AuthServiceService.loginfunction(this.loginform.value).subscribe({
        next:(response) => {
          if(response.message === 'success'){

            localStorage.setItem('etoken', response.token)
            console.log(response)
            this._AuthServiceService.dataDecode()

            this._Router.navigate(['/home'])
          }
          this.spin = false
        },

        error:(err) =>{

          this.errormesg = err.error.message
          this.spin = false
          
        }
      })
    }
    

  }

}
