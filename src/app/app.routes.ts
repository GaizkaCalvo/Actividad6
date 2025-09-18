import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { path: ""                      , pathMatch: 'full'     , redirectTo: 'home'},
    { path: "home"                  , component: UsersListComponent },
    { path: "user/:idUser"          , component: UserInformationComponent},
    { path: "newuser"               , component: UserFormComponent},
    { path: "updateuser/:idUser"    , component: UserFormComponent},
    { path: "**"                    , redirectTo: 'home' }
];
