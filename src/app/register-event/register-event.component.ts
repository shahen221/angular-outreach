import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../service/businessunit.service';
import { BusinessUnit } from '../model/businessunit';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {

  businessUnits:BusinessUnit[]=[];

  constructor(private businessUnitService: BusinessUnitService) { }

  ngOnInit() {
    this.businessUnits = this.businessUnitService.businessUnits;
    console.log('Business Units: ', this.businessUnits);
  }

}
