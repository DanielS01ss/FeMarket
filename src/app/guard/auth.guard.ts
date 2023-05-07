import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokensService } from '../services/tokens.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: TokensService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.tokenValidate()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}