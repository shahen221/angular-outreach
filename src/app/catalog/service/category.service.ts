import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService{
   
    serviceUrl: string = 'http://localhost:8089/catalog-service/api/categories/';

    constructor(private http: HttpClient){}

    getCategoryByProject(projectId: number):any{
        return this.http.get(this.serviceUrl+projectId);
    }

    getCategoryName(projectId: number, categoryId: number): any{
        return this.http.get(this.serviceUrl+projectId+"/"+categoryId);
    }
}