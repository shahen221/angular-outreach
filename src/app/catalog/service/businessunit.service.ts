import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BusinessUnit } from '../model/businessunit';


@Injectable()
export class BusinessUnitService implements OnInit{

    serviceUrl: string = 'http://localhost:8090/api/businessunits/';
    businessUnits:BusinessUnit[] =[];

    constructor(private http : HttpClient){
    }

    ngOnInit(){
    }

    getAllBusinessUnits(): any{
        return this.http.get(this.serviceUrl);
    }
}