import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DropPointsService{

    serviceUrl: string = 'http://localhost:8089/catalog-service/api/droppoints/';

    constructor(private http : HttpClient){
    }

    getDropPoints(locationId:number): any{
        return this.http.get(this.serviceUrl+locationId);
    }
}