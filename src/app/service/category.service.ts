import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService{
   
    serviceUrl: string = 'http://localhost:8090/api/categories/';

    constructor(private http: HttpClient){}

    getCategoryByProject(projectId: number):any{
        return this.http.get(this.serviceUrl+projectId);
    }
}