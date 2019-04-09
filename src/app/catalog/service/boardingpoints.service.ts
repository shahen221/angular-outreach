import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardingPointsService{

    serviceUrl: string = 'http://localhost:8090/api/boardingpoints/';

    constructor(private http : HttpClient){
    }

    getBoardingPoints(locationId:number): any{
        return this.http.get(this.serviceUrl+locationId);
    }
}