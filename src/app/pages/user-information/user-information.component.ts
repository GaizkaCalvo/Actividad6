import { Component, inject, Input, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/i-user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteUserComponent } from '../../components/delete-user/delete-user.component';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { BackHomeComponent } from '../../components/back-home/back-home.component';

@Component({
    selector: 'app-user-information',
    imports: [DeleteUserComponent, UpdateUserComponent, BackHomeComponent],
    templateUrl: './user-information.component.html',
    styleUrl: './user-information.component.css'
})
export class UserInformationComponent 
{
    @Input() idUser : string = "";
    userService     = inject(UsersService);
    router          = inject(Router);
    userInformation : IUser | undefined;

    ngOnInit()
    {
        this.getUserInformation();
    }

    async getUserInformation()
    {
        try
        {
            this.userInformation  = await this.userService.getUserById(this.idUser);
            //Response of the API was an error, not existing user we go back to home
            if (this.userInformation && 'error' in this.userInformation)
            {
                this.router.navigate(["/home"]);
            }
        }
        catch(error)
        {
            console.log("Error loading user information" + error);
        }
    }
}

