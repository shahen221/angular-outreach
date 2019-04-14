import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService{

    serviceUrl: string = 'http://localhost:8089/catalog-service/api/projects/';

    constructor(private http : HttpClient){
    }

    getAllProjects(): any{
        return this.http.get(this.serviceUrl);
    }
}