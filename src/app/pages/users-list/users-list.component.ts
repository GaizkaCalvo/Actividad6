import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IResponse, IUser } from '../../interfaces/i-user.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
    selector: 'app-users-list',
    imports: [UserCardComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css'
})
export class UsersListComponent
{
    usersService = inject(UsersService);
    vUsers : IUser[] = [];
    totalPages : number = 0;

    ngOnInit()
    {
        this.loadUsers();
    }

    async loadUsers()
    {
        try
        {
            const response : IResponse = await this.usersService.getAllUsers();
            this.vUsers = response.results;
            this.totalPages = response.total_pages;
        }
        catch(error)
        {
            console.log("Error loading users" + error);
        }
    }
    get pageArray(): number[] 
    {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }
    async changePage(event : any)
    {
        try
        {
            const response : IResponse = await this.usersService.getByPage(event.target.value);
            this.vUsers = response.results;
            this.totalPages = response.total_pages;
        }
        catch(error)
        {
            console.log("Error loading users" + error);
        }
    }
}
