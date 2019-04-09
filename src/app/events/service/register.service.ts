import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

    serviceurl: string = 'http://localhost:8091/api/register/';
    
    constructor(private http: HttpClient){
    }

    registerEvent(registerEventInfo: any) : any{
        console.log('Inside Register Service before save');
        return this.http.post(this.serviceurl+'save', registerEventInfo);
    }

    registerEventBulk(registerEventInfos: any) : any{
        console.log('Inside Register Service before bulk save');
        return this.http.post(this.serviceurl+'bulksave', registerEventInfos);
    }

    getEventsByAssociate(associateId: number): any{
        return this.http.get(this.serviceurl+'events/'+associateId);
    }

}