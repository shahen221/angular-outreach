import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEventInfo } from './CreateEvent.model';
import { LocationService } from '../service/location.service';
import { LocationInfo } from '../model/locationinfo';
import { BeneficiaryService } from '../service/beneficiary.service';
import { BeneficiaryInfo } from '../model/beneficiaryinfo';
import { CouncilService } from '../service/council.service';
import { CouncilInfo } from '../model/councilinfo';
import { ProjectService } from '../service/project.service';
import { ProjectInfo } from '../model/projectinfo';
import { CategoryService } from '../service/category.service';
import { CategoryInfo } from '../model/categoryinfo';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateeventComponent implements OnInit {
  createEventForm: FormGroup;
  createEventInfo:CreateEventInfo;
  loading = false;
  submitted = false;
  returnUrl: string;
  locations: LocationInfo[] = [];
  beneficiaries: BeneficiaryInfo[] = [];
  councils: CouncilInfo[] = [];
  projects: ProjectInfo[] = [];
  categories: CategoryInfo[]=[];

  constructor(private _location:Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private beneficiaryService: BeneficiaryService,
    private councilService: CouncilService,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(
      (result: any) => {
        console.log('Retrieved location details');
        result.forEach(element => {
          var locationInfo = {
            id: element.id,
            name: element.name,
            state: element.state,
            country: element.country
          };
          this.locations.push(locationInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving locations');
      }
    );
    this.projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log('Retrieved project details');
        result.forEach(element => {
          var projectInfo = {
            id: element.id,
            name: element.name
          };
          this.projects.push(projectInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving projects');
      }
    );
    this.createEventForm = this.formBuilder.group({
      location: ['', Validators.required],
      beneficiaryName: ['', Validators.required],
      councilName: ['', Validators.required],
      project: ['', Validators.required],
      category: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventDesc: ['', Validators.required],
      eventStartDateTime: ['', Validators.required],
      eventEndDateTime: ['', Validators.required],
      volunteerCount: ['', Validators.required],
      pocId: ['', Validators.required],
      transportBoardingType: ['', Validators.required],
      transportBoardingPoint: ['', Validators.required],
      transportDropPoint: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.createEventForm.controls; }

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    
    // stop here if form is invalid
    if (this.createEventForm.invalid) {
      this.loading = false;
        return;
    }else{
      var eventInfo={
        beneficiaryId : this.createEventForm.value.beneficiaryName,
        councilId: this.createEventForm.value.councilName,
        projectId: this.createEventForm.value.project,
        categoryId: this.createEventForm.value.category,
        title: this.createEventForm.value.eventTitle,
        description: this.createEventForm.value.eventDesc,
        startTime: this.createEventForm.value.eventStartDateTime,
        endTime: this.createEventForm.value.eventEndDateTime,
        volunteers: this.createEventForm.value.volunteerCount,
        pocId: this.createEventForm.value.pocId,
        locationId: this.createEventForm.value.location,
        boardingTypeId: this.createEventForm.value.transportBoardingType
      };
      console.log('eventInfo: ',eventInfo);
      this.eventService.saveEvent(eventInfo).subscribe(
        (result: any) => {
          var eventInfo = {
            id: result.id,
            name: result.title
          };
          console.log('Event saved: ', eventInfo);
        }
      );
      console.log("Success");
    }

    setTimeout('2000',0,this.setLoading(false));
  }

  setLoading(value:Boolean){
    this.loading = false;
  }

  loadLocationDetails(locationId){
    this.beneficiaryService.getBeneficiaries(locationId.value).subscribe(
      (result: any) => {
        console.log('Retrieved Beneficiaries');
        result.forEach(element => {
          var beneficiaryInfo = {
            id: element.id,
            name: element.name,
            locationId: element.locationId
          };
          this.beneficiaries.push(beneficiaryInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving Beneficiaries');
      }
    );
    this.councilService.getCouncilByLocation(locationId.value).subscribe(
      (result: any) => {
        console.log('Retrieved council info');
        result.forEach(element => {
          var councilInfo = {
            id: element.id,
            name: element.name,
            locationId: element.locationId
          };
          this.councils.push(councilInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving council info');
      }
    );
  }

  loadCategories(projectId){
    this.categoryService.getCategoryByProject(projectId.value).subscribe(
      (result: any) => {
        console.log('Retrieved Categories');
        result.forEach(element => {
          var categoryInfo = {
            id: element.id,
            name: element.name,
            projectId: element.projectId
          };
          this.categories.push(categoryInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving categories');
      }
    );
  }

}
