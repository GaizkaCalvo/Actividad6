import { Component, input } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
    sUserID     = input<string>();
    bIconActive = input<boolean>();
}
