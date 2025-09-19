import { Component, inject, input } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/i-user.interface';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent 
{
    sUserID     = input<string>();
    bIconActive = input<boolean>();
    userData!: IUser;
    userService = inject(UsersService);

    async ngOnInit()
    {
        //NULLISH COALESCING OPERATOR --> returns the right argument if the left one is NULL or UDNEFINED
        const userId = this.sUserID() ?? '';
        this.userData =  await this.userService.getUserById(userId);
    }

    deleteButtonCLicked()
    {
        Swal.fire({
            title: `Deseas Borrar al usuario ${this.userData.first_name}?`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText : "Cancelar"
            
        }).then((result) =>
        {
            if(result.isConfirmed)
            {
                this.deleteConfirmed();
            }
        })
    }
    async deleteConfirmed()
    {
        //NULLISH COALESCING OPERATOR --> returns the right argument if the left one is NULL or UDNEFINED
        const userId = this.sUserID() ?? '';
        try
        {
            await this.userService.deleteUser(userId);
        }
        catch(error)
        {
            console.log(`Error trying to delete User : ${{error}}`)
        }
    }
}
