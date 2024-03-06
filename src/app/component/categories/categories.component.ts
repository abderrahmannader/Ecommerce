import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService){}

  AllCategory:any
  Subcategory:any 
  CategoryName:string = ''

  ngOnInit(): void {
    this._EcomdataService.getAllCategory().subscribe({
      next:(response)=>{

        this.AllCategory = response.data
      }
    })
  }

  specsCatg(id:any,name:string):void{

    this.CategoryName = name

    this._EcomdataService.getspecCategory(id).subscribe({
      next:(response)=>{
        console.log(response)
        this.Subcategory = response.data
      }
    })

  }

}
