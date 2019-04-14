import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CouncilService{

    serviceurl: string = 'http://localhost:8089/catalog-service/api/councils/1';
    serviceurl1: string = 'http://localhost:8089/catalog-service/api/councils/';
    
    constructor(private http: HttpClient){
    }

    getAllCouncils() : any{
       return this.http.get(this.serviceurl);
    }

    getCouncilByLocation(locationId: number): any{
        return this.http.get(this.serviceurl1+locationId);
    }
}