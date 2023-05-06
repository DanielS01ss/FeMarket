import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor(private http: HttpClient) { }

  public storeTokens(token: string, refresh: string): void {
    try {
      jwtDecode(token);
      localStorage.setItem('access_token', JSON.stringify(token));
    }
    catch (e) {
      console.error("Error decoding token");
    }

    try {
      jwtDecode(refresh);
      localStorage.setItem('refresh_token', JSON.stringify(refresh));
    }
    catch (e) {
      console.error("Error decoding token");
    }
  }

  public refreshToken(): void {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('access_token')!)});
      this.http.post('http://185.146.86.118:5000/refresh_token', refresh_token, {headers: headers}).subscribe((response: any) => {
        localStorage.setItem('access_token', response);
      });
    }
  }
}
