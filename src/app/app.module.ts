import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LeftNavComponent } from './core/left-nav/left-nav.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { PmoPageComponent } from './pmo-page/pmo-page.component';
import { PocPageComponent } from './poc-page/poc-page.component';
import { AssociatePageComponent } from './associate-page/associate-page.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CatalogModule } from './catalog/catalog.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftNavComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    AdminPageComponent,
    PmoPageComponent,
    PocPageComponent,
    AssociatePageComponent,
    CreateRoleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CatalogModule,
    EventsModule,
    AuthModule
  ],
  providers: [
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
