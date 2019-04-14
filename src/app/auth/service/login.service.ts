import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

    serviceurl: string = 'http://localhost:8089/user-mgmt-service/api/login/authenticate';
    role: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    
    constructor(private http: HttpClient){
    }

    validateUser( username : string, password : string) : any{
       return this.http.post(this.serviceurl, {'username': username, 'password' : password})
        .pipe(
            map(
                (result: any) => {
                    if(result.status == 'SUCCESS'){
                        console.log('User credentials are correct');
                        this.role = result.roleName;
                        this.employeeId = result.employeeId;
                        this.firstName = result.firstName;
                        this.lastName = result.lastName;
                    }else{
                        console.log('Invalid user credentials');
                        this.role = null;
                    }
                    return result;
                }
            ),
            catchError(
                (err: any) => { 
                    console.log('Error occured while validating user credentials', err); 
                    return throwError(err);
                }
            )
        );
    }

    getUserRole(){
        return this.role;
    }
}