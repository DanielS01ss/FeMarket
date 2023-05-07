import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonClickedService } from 'src/app/services/button-clicked.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss']
})
export class LeftNavbarComponent {

    activated_button:number = 0;

    constructor(private router:Router,private btnClickedService: ButtonClickedService){
      this.activated_button = btnClickedService.getData();
    }

    navigateTo(option:number){
        switch(option){
          case 0:
            this.router.navigate(["/view"]);
            break;
          case 1:
            this.router.navigate(['/view']);
            this.btnClickedService.updateClicked(1);
            break;
          case 2:
            this.router.navigate(['/graphs']);
            this.btnClickedService.updateClicked(2);
            break;
          case 3:
            this.router.navigate(['/upload']);
            this.btnClickedService.updateClicked(3);
            break;
          case 4:
            this.router.navigate(['/user-profile']);
            this.btnClickedService.updateClicked(4);
            break;
          default:
              this.router.navigate(['/view']);
              break;
        }
    }

    logout(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      this.router.navigate(['/sign-in']);
    }
}
