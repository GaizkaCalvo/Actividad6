import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/i-user.interface';
import { EventManager } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class UsersService 
{
    private httpClient = inject(HttpClient);
    private baseUrl : string = "https://peticiones.online/api/users";

    @Output() userDeleted : EventEmitter<any> = new EventEmitter();

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
    getByPage(page : string) : Promise<any>
    {
        return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`));
    }
    
    getUserById(userId : string) : Promise<any>
    {
        return this.getAllUsers(this.baseUrl + "/" + userId);
    }

    updateUser(updatedUser : IUser) : Promise<any>
    {
        return lastValueFrom(this.httpClient.put<IUser>(this.baseUrl + "/" +updatedUser._id, updatedUser));
    }

    createUser(newUser : IUser) : Promise<any>
    {
        return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, newUser));
    }

    async deleteUser(userId : string) : Promise<any>
    {
        try
        {
            const response = await lastValueFrom(this.httpClient.delete<IUser>(this.baseUrl + "/" + userId));
            //Response of the API was an error
            if (response && 'error' in response)
            {
                console.log(`Petition of the users delete gave error: ${'error' in response}`);
                return response; //We dont emmit as we didnt delete the user
            }

            this.userDeleted.emit();
            return response;
        }
        catch(error)
        {
            return error;
        }
    }
}
