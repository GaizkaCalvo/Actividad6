import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-user',
  imports: [RouterLink],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
    sUserID = input<string>();
    bIconActive = input<boolean>();
}
