import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../catalog/service/businessunit.service';
import { BusinessUnit } from '../../catalog/model/businessunit';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInfo } from '../model/eventinfo';
import { EventService} from '../service/event.service';
import { RegisterService } from '../service/register.service';

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
  showRegistrationForm: boolean = false;

  constructor(private businessUnitService: BusinessUnitService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private eventService: EventService,
              private registerService: RegisterService) { }

  ngOnInit() {
    this.businessUnitService.getAllBusinessUnits().subscribe(
        (result: any) => {
            console.log('Business Units retrieved successfully');
            result.forEach(element => {
              var businessUnit = {
                id: element.id,
                name: element.name
              }
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
            (result : any) => {
              var eventInfo: EventInfo = {
                id: result.id,
                beneficiaryId: result.beneficiaryId,
                councilId: result.councilId,
                projectId: result.projectId,
                categoryId: result.categoryId,
                name : result.title,
                desc: result.description,
                startTime: result.startTime,
                endTime: result.endTime,
                status: result.status,
                volunteers: result.volunteers,
                pocId: result.pocId,
                pocContactNo: result.pocContactNo,
                locationId: result.locationId,
                venueAddress: result.venueAddress,
                boardingTypeId: result.boardingTypeId,
                boardingPoints: result.boardingPoints,
                dropPoints: result.dropPoints,
                updatedBy: result.updatedBy,
                favorite: result.favorite
              };
              this.eventInfo = eventInfo;
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
  }
    // convenience getter for easy access to form fields
  get f() { 
      return this.registerEventForm.controls; 
  }
  displayRegistrationForm(){
    this.showRegistrationForm = true;
  }

  onSubmit() {
   // stop here if form is invalid
    if (this.registerEventForm.invalid) {
      this.loading = false;
        return;
    }else{
      var eventRegisterInfo={
        eventId : this.eventInfo.id,
        scheduledDate: this.eventInfo.startTime,
        associateId: this.registerEventForm.value.associateId,
        associateFirstName: this.registerEventForm.value.firstName,
        associateLastName: this.registerEventForm.value.lastName,
        hoursSpent: 4,
        travelHours: 4,
        impactedLives: 100,
        businessUnitId: this.registerEventForm.value.businessUnit,
        status: 'active',
        boardingTypeId: this.eventInfo.boardingTypeId,
        boardingPointId: this.registerEventForm.value.boardingPoint,
        dropPointId: this.registerEventForm.value.dropPoint,
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
