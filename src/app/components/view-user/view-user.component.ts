import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-user',
  imports: [RouterLink],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
    sUserID = input<string>();
    bIconActive = input<boolean>();
}
