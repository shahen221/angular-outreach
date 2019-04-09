import { Component, OnInit, Input, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/service/login.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  role: string;
  employeeId: number;
  firstName: string;
  lastName: string;

  @Input() page:String;
  constructor(private render:Renderer,private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.role=this.loginService.getUserRole();
    this.employeeId=this.loginService.employeeId;
    this.firstName=this.loginService.firstName;
    this.lastName=this.loginService.lastName;
  }

  clickActive(event:any,path:any){
    event.preventDefault()
    this.render.setElementClass(event.target,"active",false);
    this.router.navigateByUrl("/"+path);
  }

}
