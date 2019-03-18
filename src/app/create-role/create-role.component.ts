import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateRoleInfo } from './createrole.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  createRoleInfo:CreateRoleInfo;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private _location:Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createRoleForm = this.formBuilder.group({
      associateId: ['', Validators.required],
      associateName: ['', Validators.required],
      password: ['', Validators.required],
      dob: ['', Validators.required],
      role: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.createRoleForm.controls; }

  cancel() {
    this.router.navigateByUrl("login");
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    
    // stop here if form is invalid
    if (this.createRoleForm.invalid) {
      this.loading = false;
        return;
    }else{
      this.createRoleInfo = new CreateRoleInfo;
      this.createRoleInfo.associateId = this.createRoleForm.value.associateId;
      this.createRoleInfo.associateName = this.createRoleForm.value.associateName;
      this.createRoleInfo.password = this.createRoleForm.value.password;
      this.createRoleInfo.dob = this.createRoleForm.value.dob;
      this.createRoleInfo.role = this.createRoleForm.value.role;
      
      console.log("Success");
      console.log(this.createRoleInfo);
    }

    setTimeout('2000',0,this.setLoading(false));
  }

  setLoading(value:Boolean){
    this.loading = false;
  }

}
