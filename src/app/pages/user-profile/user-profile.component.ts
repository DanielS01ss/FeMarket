import { Component } from '@angular/core';
import { ButtonClickedService } from 'src/app/services/button-clicked.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(private btnClickedService:ButtonClickedService){
    this.btnClickedService.updateClicked(4);
  }
}
