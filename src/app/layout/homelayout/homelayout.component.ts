import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent {
  constructor( private _Renderer2:Renderer2){

  }

  arrowToUp(){
    window.scrollTo(0,0)
  }

  

}
