import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BeneficiaryService{

    serviceUrl: string = 'http://localhost:8089/catalog-service/api/beneficiaries/';

    constructor(private http : HttpClient){
    }

    getBeneficiaries(locationId: number): any{
        console.log('Inside Beneficiary Service: locationId ', locationId);
        return this.http.get(this.serviceUrl+locationId);
    }
}