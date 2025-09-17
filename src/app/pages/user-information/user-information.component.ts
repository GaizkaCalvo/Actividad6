import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TypeofExpression } from '@angular/compiler';
import { IUser } from '../../interfaces/i-user.interface';
import { ActivatedRoute } from '@angular/router';
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
    userService     = inject(UsersService);
    activatedRoute  = inject(ActivatedRoute);
    userId : string = "";
    userInformation : IUser | undefined;

    ngOnInit()
    {
        this.activatedRoute.params.subscribe(params =>
        {
            this.userId = params["idUser"];
        })

        this.getUserInformation();
    }

    async getUserInformation()
    {
        try
        {
            this.userInformation  = await this.userService.getUserById(this.userId);
        }
        catch(error)
        {
            console.log("Error loading user information" + error);
        }
    }
}

