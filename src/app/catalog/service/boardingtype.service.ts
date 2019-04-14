import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardingTypeService{

    serviceUrl: string = 'http://localhost:8089/catalog-service/api/boardingtypes/';

    constructor(private http : HttpClient){
    }

    getBoardingTypes(): any{
        console.log('Inside Boarding Type Service: ');
        return this.http.get(this.serviceUrl);
    }
}