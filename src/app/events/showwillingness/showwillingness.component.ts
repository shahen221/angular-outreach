import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../auth/service/login.service';
import { AssociateWillingnessService } from '../service/associatewillingness.service';
import { LocationService } from '../../catalog/service/location.service';
import { LocationInfo } from '../../catalog/model/locationinfo';

@Component({
  selector: 'app-showwillingness',
  templateUrl: './showwillingness.component.html',
  styleUrls: ['./showwillingness.component.css']
})
export class ShowwillingnessComponent implements OnInit {

  associateWillingnessForm: FormGroup;
  loading:boolean;
  locations:LocationInfo[]=[];

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private associateWillingnessService: AssociateWillingnessService,
              private locationService: LocationService) { }

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
        console.log('Error occured while retrieving locations', error);
      }
    );
    this.associateWillingnessForm = this.formBuilder.group({
        locationName: ['', Validators.required],
        availableStartTime: ['', Validators.required],
        availableEndTime: ['', Validators.required]
      });
  }

   get f() { 
      return this.associateWillingnessForm.controls; 
  }

  onSubmit(){
    if (this.associateWillingnessForm.invalid) {
      this.loading = false;
        return;
    }else{
      var willingnessInfo={
        employeeId : this.loginService.employeeId,
        locationId: this.associateWillingnessForm.value.locationName,
        availabilityStartTime: this.associateWillingnessForm.value.availableStartTime,
        availabilityEndTime: this.associateWillingnessForm.value.availableEndTime
      };
      console.log('Associate Willingness Info before submit: ',willingnessInfo);
      this.associateWillingnessService.saveWillingness(willingnessInfo).subscribe(
        (result: any) => {
          console.log('Successfully saved willingness info');
        },
        (error: any) => {
          console.log('Error occured while saving willingness info');
        }
      );
    }
  }
}
