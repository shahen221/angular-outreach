import { Component, OnInit } from '@angular/core';
import {Renderer} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private render:Renderer,private router: Router) { }

  ngOnInit() {
  }

  clickActive(event:any,path:any){
    event.preventDefault()
    this.render.setElementClass(event.target,"active",false);
    this.router.navigateByUrl("/"+path);
  }
  
}
