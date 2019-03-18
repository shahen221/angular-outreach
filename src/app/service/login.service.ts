import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

    serviceurl: string = 'http://localhost:8092/api/login/authenticate';
    role: string;
    
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