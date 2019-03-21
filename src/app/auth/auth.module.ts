import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,AppRoutingModule
  ],
  providers:[
    LoginService
  ]
})
export class AuthModule { }
