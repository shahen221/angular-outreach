import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../catalog/service/businessunit.service';
import { BusinessUnit } from '../../catalog/model/businessunit';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInfo } from '../model/eventinfo';
import { EventService} from '../service/event.service';
import { RegisterService } from '../service/register.service';
import { CatalogService } from '../../catalog/catalog.service';
import { BoardingPoints } from '../../catalog/model/boardingpoints';
import { DropPoints } from '../../catalog/model/droppoints';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {

  businessUnits:BusinessUnit[]=[];
  eventId: number;
  registerEventForm: FormGroup;
  eventInfo: EventInfo;
  loading: boolean = false;
  showRegistrationForm: boolean;
  boardingPoints: BoardingPoints[]=[];
  dropPoints: DropPoints[]=[];

  constructor(private businessUnitService: BusinessUnitService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private eventService: EventService,
              private registerService: RegisterService,
              private catalogService: CatalogService) { }

  ngOnInit() {
    this.businessUnitService.getAllBusinessUnits().subscribe(
        (result: any) => {
            console.log('Business Units retrieved successfully');
            result.forEach(element => {
              var businessUnit = {
                id: element.id,
                name: element.name
              };
              this.businessUnits.push(businessUnit);
            });  
        },
        (error: any) => {
            console.log('Error occured while retrieving business units.');
        }
      );
      this.route.params.subscribe(
        (params: Params) => {
          this.eventId = +params['id'];
          console.log('Event Id recieved from route parameter: ', this.eventId);
          this.eventService.getEventById(this.eventId).subscribe(
            (element : any) => {
              var eventInfo: EventInfo = {
                id: element.id,
                beneficiaryId: element.beneficiary.id,
                beneficiaryName: element.beneficiary.name,
                councilId: element.council.id,
                councilName: element.council.name,
                projectId: element.project.id,
                projectName: element.project.name,
                categoryId: element.projectCategory.id,
                categoryName: element.projectCategory.name,
                name : element.title,
                desc: element.description,
                startTime: element.startTime,
                endTime: element.endTime,
                status: element.status,
                volunteers: element.volunteers,
                pocId: element.pocId,
                pocContactNo: element.pocContactNo,
                locationId: element.location.id,
                locationName: element.location.name,
                locationState: element.location.state,
                locationCountry: element.location.country,
                venueAddress: element.venueAddress,
                boardingTypeId: element.boardingTypeId,
                boardingPoints: element.boardingPoints,
                dropPoints: element.dropPoints,
                updatedBy: element.updatedBy,
                favorite: element.favorite
              };
              this.eventInfo = eventInfo;
              this.catalogService.getBoardingPoints(+eventInfo.locationId);
              this.catalogService.getDropPoints(+eventInfo.locationId);
              console.log('Event Retrieved from service: ', this.eventInfo);
              this.loading = true;
            },
            (error : any) => {
              console.log('Error occured while retreiving event information.');
            }
          );
        }
      );
      this.registerEventForm = this.formBuilder.group({
        boardingPoint: [''],
        dropPoint: [''],
        associateId: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        businessUnit: ['', Validators.required]
      });
      this.showRegistrationForm = false;  
  }
    // convenience getter for easy access to form fields
  get f() { 
      return this.registerEventForm.controls; 
  }
  displayRegistrationForm(){
    this.showRegistrationForm = true;
    this.boardingPoints = this.catalogService.boardingPoints;
    this.dropPoints = this.catalogService.dropPoints;
  }

  onSubmit() {
   // stop here if form is invalid
    if (this.registerEventForm.invalid) {
      this.loading = false;
        return;
    }else{
      var eventRegisterInfo={
        event : {
                  id: this.eventInfo.id
                },
        scheduledDate: this.eventInfo.startTime,
        associateId: this.registerEventForm.value.associateId,
        associateFirstName: this.registerEventForm.value.firstName,
        associateLastName: this.registerEventForm.value.lastName,
        businessUnitId: this.registerEventForm.value.businessUnit,
        status: 'active',
        boardingType: {
                        id: this.eventInfo.boardingTypeId
                      },
        boardingPointId: this.registerEventForm.value.boardingPoint,
        dropPointId: this.registerEventForm.value.dropPoint,
        location: { 
                    id: 1
                  }
      };
      console.log('eventRegisterInfo: ',eventRegisterInfo);
      this.registerService.registerEvent(eventRegisterInfo).subscribe(
        (result: any) => {
          var eventRegisterInfo = {
            id: result.id,
            eventId: result.eventId,
            associateId: result.associateId
          };
          console.log('Associate Registered Event: ', eventRegisterInfo);
        }
      );
    }
  }

}
