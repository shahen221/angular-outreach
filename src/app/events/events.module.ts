import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { EventService } from './service/event.service';
import { RegisterService } from './service/register.service';
import { CreateeventComponent } from './createevent/createevent.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { RegisterEventComponent } from './register-event/register-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { FavoriteEventsComponent } from './favorite-events/favorite-events.component';
import { CreatebulkeventComponent } from './createbulkevent/createbulkevent.component';
import { CreatebulkregistrationComponent } from './createbulkregistration/createbulkregistration.component';
import { ShowwillingnessComponent } from './showwillingness/showwillingness.component';
import { AssociateWillingnessService } from './service/associatewillingness.service';

@NgModule({
  declarations: [
                  CreateeventComponent,
                  ViewEventsComponent,
                  RegisterEventComponent,
                  MyEventsComponent,
                  FavoriteEventsComponent,
                  CreatebulkeventComponent,
                  CreatebulkregistrationComponent,
                  ShowwillingnessComponent
                ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
              EventService,
              RegisterService,
              AssociateWillingnessService
            ]
})
export class EventsModule { }
