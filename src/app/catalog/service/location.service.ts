import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService{

    serviceUrl: string = 'http://localhost:8089/catalog-service/api/locations/';
    
    constructor(private http : HttpClient){
    }

    getAllLocations(): any{
        return this.http.get(this.serviceUrl);
    }
}