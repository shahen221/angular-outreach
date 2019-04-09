import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    failure:boolean=false;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    roleName: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private render:Renderer,
    private loginService : LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
        return;
    }else{
      this.loginService.validateUser(this.loginForm.value.username, this.loginForm.value.password ).subscribe(
        (result : any) => {
          this.roleName = result.roleName;
            console.log('Data returned from login service: ', result);
            if(this.roleName != null && this.roleName == "Admin"){
              this.router.navigateByUrl("adminPage");
            }else if(this.roleName != null && this.roleName == "PMO"){
              this.router.navigateByUrl("pmoPage");
            }else if(this.roleName != null && this.roleName == "POC"){
              this.router.navigateByUrl("pocPage");
            }else if(this.roleName != null && this.roleName == "Associate"){
              this.router.navigateByUrl("associatePage");
            }else{
              this.failure = true;
            }
        }, (error : any) =>{
            console.log('user credentials are invaild');
        }
      );
    }

    setTimeout('2000',0,this.setLoading(false));
  }

  setLoading(value:boolean){
    this.loading = false;
  }
  
  clickActive(event:any,path:any){
    event.preventDefault()
    this.render.setElementClass(event.target,"active",false);
    this.router.navigateByUrl("/"+path);
  }

}
