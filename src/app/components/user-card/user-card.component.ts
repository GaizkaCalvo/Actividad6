import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/i-user.interface';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
    selector: 'app-user-card',
    imports: [DeleteUserComponent, UpdateUserComponent, ViewUserComponent],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent 
{
    oUsersList = input<IUser>();
}
