import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';

export const routes: Routes = [
    { path: ""              , pathMatch: 'full'     , redirectTo: 'home'},
    { path: "home"          , component: UsersListComponent },
    { path: "user/:idUser"  , component: UserInformationComponent},
    { path: "**"            , redirectTo: 'home' }
];
