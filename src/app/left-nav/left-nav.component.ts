import { Component, OnInit, Input, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  @Input() page:String;
  constructor(private render:Renderer,private router: Router) { }

  ngOnInit() {
  }

  clickActive(event:any,path:any){
    event.preventDefault()
    this.render.setElementClass(event.target,"active",false);
    this.router.navigateByUrl("/"+path);
  }

}
