import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssociateWillingnessService {

    serviceurl: string = 'http://localhost:8091/api/willingness/';
    
    constructor(private http: HttpClient){
    }

    saveWillingness(willingnessInfo: any) : any{
        console.log('Inside AssociateWillingness Service before save');
        return this.http.post(this.serviceurl+'save', willingnessInfo);
    }

    getWillingnessByAssociate(employeeId: number): any{
        return this.http.get(this.serviceurl+employeeId);
    }
    
    getWillingnessByAssociateAndLocation(employeeId: number, locationId: number): any{
        return this.http.get(this.serviceurl+employeeId+'/'+locationId);
    }

}