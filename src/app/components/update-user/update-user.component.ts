import { Component, input } from '@angular/core';

@Component({
  selector: 'app-update-user',
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
    sUserID = input<string>();
    bIconActive = input<boolean>();
}
