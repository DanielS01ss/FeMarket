import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-table',
  templateUrl: './user-profile-table.component.html',
  styleUrls: ['./user-profile-table.component.scss']
})
export class UserProfileTableComponent {
  constructor(private router: Router){

  }

  GoToUserProfile() {
    this.router.navigate(['user-profile']);
  }
}
