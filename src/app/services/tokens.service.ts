import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor(private http: HttpClient, private router: Router) { }

  public storeTokens(token: string, refresh: string): void {
    try {
      jwtDecode(token);
      localStorage.setItem('access_token', token);
    }
    catch (e) {
      console.log("Error decoding token");
    }

    try {
      jwtDecode(refresh);
      localStorage.setItem('refresh_token', refresh);
    }
    catch (e) {
      console.log("Error decoding token");
    }
  }

  private refreshToken(): void {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('refresh_token')});
        const data = {
          'refresh_token': localStorage.getItem('refresh_token')
        }
      this.http.post('http://185.146.86.118:5000/refresh_token', data, {headers: headers}).subscribe((response: any) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', response);
        window.location.reload();
      });
    }
  }

  public tokenValidate():boolean{
    const token: any = localStorage.getItem('access_token');
    const refresh_token: any = localStorage.getItem('refresh_token');

    if(!token || !refresh_token){
      return false;
    }

    try {
      jwtDecode(token);   
        try {
          jwtDecode(refresh_token);
          return true;
        }
        catch (e) {
          return false;
        }
          
    }
    catch (e) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return false;
    }
  }

  public checkToken(): void {
    const token: any = localStorage.getItem('access_token');
    const refresh_token: any = localStorage.getItem('refresh_token');
    const expirationDate = new Date(0);
    const decodedRefreshToken: any = jwtDecode(refresh_token);
    expirationDate.setUTCSeconds(decodedRefreshToken.exp);
    const isExpiredRefresh = expirationDate < new Date();
    if (isExpiredRefresh) {
      this.router.navigate(['sign-in']);
      return;
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('access_token')});
    const data = {
      'refresh_token': localStorage.getItem('access_token')
    }
    this.http.post('http://185.146.86.118:8079/verifytoken', data, {headers: headers, observe: 'response'}).subscribe((response: any) => {
      return;
    }, error => {
      if(error.status === 401) {
        this.refreshToken();
      };
    });
  }
}
