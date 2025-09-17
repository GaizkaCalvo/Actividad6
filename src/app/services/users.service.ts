import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService 
{
    private httpClient = inject(HttpClient);
    private baseUrl : string = "https://peticiones.online/api/users";

    getAllUsers(url?: string) : Promise<any>
    {
        if(url === undefined)
        {
            return lastValueFrom(this.httpClient.get<any>(this.baseUrl));
        }
        else
        {
            return lastValueFrom(this.httpClient.get<any>(url));
        }
    }
    
    getUserById(userId : string) : Promise<any>
    {
        return this.getAllUsers(this.baseUrl + "/" + userId);
    }
}
