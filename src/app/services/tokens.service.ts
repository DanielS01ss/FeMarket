import { HttpClient } from '@angular/common/http';
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
      localStorage.setItem('access_token', token);
    }
    catch (e) {
      console.error("Error decoding token");
    }

    try {
      jwtDecode(refresh);
      localStorage.setItem('refresh_token', refresh);
    }
    catch (e) {
      console.error("Error decoding token");
    }
  }

  public refreshToken(): void {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      this.http.get
    }
  }
}
