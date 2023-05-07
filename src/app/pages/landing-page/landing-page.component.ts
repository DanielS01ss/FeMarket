import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'market-place-fe';

  darkMode = false;
  constructor(private router:Router){
    this.detectColorScheme();
  }

  detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
      document.documentElement.setAttribute('data-theme', 'this.darkMode ? "dark" : "light"');
    }
}

  toggleTheme(){
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }

  navigateToLogin(){
    this.router.navigate(['/sign-in']);
  }

  navigateToSignup(){
    this.router.navigate(['/sign-up']);
  }
}
