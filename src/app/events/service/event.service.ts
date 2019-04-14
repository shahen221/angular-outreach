import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

    serviceurl: string = 'http://localhost:8089/event-mgmt-service/api/events/';
    
    constructor(private http: HttpClient){
    }

    getAllEvents() : any{
       return this.http.get(this.serviceurl);
    }

    saveEvent(eventInfo: any) : any{
        console.log('Inside Event Service before save');
        return this.http.post(this.serviceurl+'save', eventInfo);
    }

    saveBulkEvents(events: any) : any{
        console.log('Inside Event Service before bulk save');
        return this.http.post(this.serviceurl+'bulksave', events);
    }

    getEventById(id: number) : any{
        return this.http.get(this.serviceurl+id);
    }

}