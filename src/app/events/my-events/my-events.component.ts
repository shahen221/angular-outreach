import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RegistrationInfo } from '../model/registrationinfo';
import { CatalogService } from '../../catalog/catalog.service';
import { BoardingPoints } from '../../catalog/model/boardingpoints';
import { DropPoints } from '../../catalog/model/droppoints';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  registrationId: number;
  registeredEventInfos: RegistrationInfo[]=[];
  boardingPoints: BoardingPoints[]=[];
  dropPoints: DropPoints[]=[];

  constructor(private registerService: RegisterService,
              private catalogService: CatalogService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.boardingPoints = this.catalogService.boardingPoints;
    this.dropPoints = this.catalogService.dropPoints;
    this.route.params.subscribe(
        (params: Params) => {
          this.registrationId = +params['associateid'];
          console.log('Registration Id recieved from route parameter: ', this.registrationId);
          this.registerService.getEventsByAssociate(this.registrationId).subscribe(
            (result : any) => {
              result.forEach(element => {
                console.log('Event Info recievd from Service: ', element);
                var registeredEventInfo: RegistrationInfo = {
                  id: element.id,
                  eventName: element.event.title,
                  scheduledDate: element.scheduledDate,
                  boardingPoint: this.boardingPoints[element.boardingPointId-1].name,
                  dropPoint: this.dropPoints[element.dropPointId-1].name,
                  status: element.status,
                  location: element.location.name,
                  locationId: element.location.id
                };
                this.registeredEventInfos.push(registeredEventInfo);
              });
              console.log('Event Retrieved from service: ',this.registeredEventInfos);
            },
            (error : any) => {
              console.log('Error occured while retreiving event information.');
            }
          );
        }
      );
  }

}
