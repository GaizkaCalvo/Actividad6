import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/i-user.interface';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent 
{
    @Input() idUser : string = "";
    userService     = inject(UsersService);
    userInformation : IUser | undefined;

    userReactiveForm : FormGroup;
    formTitle : string = "NUEVO USUARIO";
    formButton : string = "Guardar";
    bFormSubmitted : boolean = false;
    bNewUserCreated : boolean = false;
    bUserUpdated : boolean = false;
    
    constructor()
    {
        this.userReactiveForm = new FormGroup
        ({
            userName     : new FormControl("", [Validators.required, Validators.pattern(/.*[a-zA-Z].*/)]),
            userLastname : new FormControl("", [Validators.required, Validators.pattern(/.*[a-zA-Z].*/)]),
            userEmail    : new FormControl("", 
                            [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
            userImage    : new FormControl("", [Validators.required, Validators.pattern(/.*[a-zA-Z].*/)]),
        })
    }

    ngOnInit()
    {
        //If the user is undefined, page is dedicated to CREATE USER
        if(this.idUser != undefined)
        {
            this.getUserInformation();
            this.formTitle  = "ACTUALIZAR USUARIO";
            this.formButton = "Actualizar";
        }
    }

    async getUserInformation()
    {
        try
        {
            this.userInformation  = await this.userService.getUserById(this.idUser);
        }
        catch(error)
        {
            console.log("Error loading user information" + error);
        }
        
        this.userReactiveForm.patchValue
        ({
            userName     : this.userInformation?.first_name,
            userLastname : this.userInformation?.last_name,
            userEmail    : this.userInformation?.email, 
            userImage    : this.userInformation?.image,
        })
    }
    async submitForm()
    {
        this.bFormSubmitted = true;
        this.bNewUserCreated = false;
        this.bUserUpdated = false;

        if(this.userReactiveForm.invalid)
        {
            return;
        }

        //Create the new user if we didnt load one
        if(this.userInformation == undefined)
        {
            this.userInformation = {
                _id:  "",
                id: 0,
                first_name: this.userReactiveForm.value.userName,
                last_name: this.userReactiveForm.value.userLastname,
                username: this.userReactiveForm.value.userName + "." + this.userReactiveForm.value.userLastname,
                email: this.userReactiveForm.value.userEmail,
                image: this.userReactiveForm.value.userImage,
                password: ""
            };
                
            try
            {
                await this.userService.createUser(this.userInformation);

                this.bNewUserCreated = true;
                this.userReactiveForm.reset();
            }
            catch(error)
            {
                console.log("Error creating user" + error);
            }
            this.userInformation = undefined;
            this.bFormSubmitted = false;
        }
        else //Update information of the user
        {
            this.userInformation.first_name = this.userReactiveForm.value.userName;
            this.userInformation.last_name  = this.userReactiveForm.value.userLastname;
            this.userInformation.email      = this.userReactiveForm.value.userEmail;
            this.userInformation.image      = this.userReactiveForm.value.userImage;

            try
            {
                await this.userService.updateUser(this.userInformation);

                this.bUserUpdated = true;
            }
            catch(error)
            {
                console.log("Error updating user information" + error);
            }
            this.bFormSubmitted = false;
        }
    }
}
