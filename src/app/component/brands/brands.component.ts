import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService){  }

  AllBrands:any 
  specBrand:any = ''

    ngOnInit(): void {
      this._EcomdataService.getAllBrands().subscribe({
        next:(response)=>{
          this.AllBrands = response.data
        }
      })
    }

    getspecbrand(brandId:any):void{
      this._EcomdataService.getspecBrands(brandId).subscribe({
        next:(response)=>{
          this.specBrand = response.data
          console.log(response)
        }
      })
    }

}
