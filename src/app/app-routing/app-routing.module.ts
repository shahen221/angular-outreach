import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { LoginComponent } from '../auth/login/login.component';
import { CreateeventComponent } from '../events/createevent/createevent.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { PmoPageComponent } from '../pmo-page/pmo-page.component';
import { PocPageComponent } from '../poc-page/poc-page.component';
import { AssociatePageComponent } from '../associate-page/associate-page.component';
import { ViewEventsComponent } from '../events/view-events/view-events.component';
import { RegisterEventComponent } from '../events/register-event/register-event.component';
import { MyEventsComponent } from '../events/my-events/my-events.component';
import { FavoriteEventsComponent } from '../events/favorite-events/favorite-events.component';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { CreatebulkeventComponent } from '../events/createbulkevent/createbulkevent.component';
import { CreatebulkregistrationComponent } from '../events/createbulkregistration/createbulkregistration.component';
import { ShowwillingnessComponent } from '../events/showwillingness/showwillingness.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createrole', component: CreateRoleComponent},
  { path: 'adminPage', component: AdminPageComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'viewevents' },
    { path: 'viewevents', component: ViewEventsComponent},
    { path: 'favoriteevents', component: FavoriteEventsComponent},
    { path: 'createrole', component: CreateRoleComponent},
    { path: 'createevent', component: CreateeventComponent},
    { path: 'createbulkevent', component: CreatebulkeventComponent}
  ]},
  { path: 'pmoPage', component: PmoPageComponent , children:[
    { path: '', pathMatch: 'full', redirectTo: 'viewevents' },
    { path: 'viewevents', component: ViewEventsComponent}
  ]},
  { path: 'pocPage', component: PocPageComponent , children:[
    { path: '', pathMatch: 'full', redirectTo: 'viewevents' },
    { path: 'viewevents', component: ViewEventsComponent}
  ]},
  { path: 'associatePage', component: AssociatePageComponent , children:[
    { path: '', pathMatch: 'full', redirectTo: 'viewevents' },
    { path: 'viewevents', component: ViewEventsComponent},
    { path: 'myevents/:associateid', component: MyEventsComponent},
    { path: 'registerevent/:id', component: RegisterEventComponent},
    { path: 'showwillingness', component: ShowwillingnessComponent},
    { path: 'createbulkregistration', component: CreatebulkregistrationComponent}
  ]}
  
  
  
];
@NgModule({
  exports:[RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
