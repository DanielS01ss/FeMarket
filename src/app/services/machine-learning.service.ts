import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TokensService} from "./tokens.service";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MachineLearningService {

  constructor(private http:HttpClient, private tokenService:TokensService) {
   }

   fetchCPUData() : Observable<any>{
    this.tokenService.checkToken();
    const access_token = localStorage.getItem('access_token');
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    }
  
    return this.http.get('http://185.146.86.118:5000/get_prediction/CPU',httpOptions);
  }
  fetchGPUData() : Observable<any>{
    this.tokenService.checkToken();
    const access_token = localStorage.getItem('access_token');
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    }
  
    return this.http.get('http://185.146.86.118:5000/get_prediction/GPU',httpOptions);
  }

  fetchConsolesData() : Observable<any>{
    this.tokenService.checkToken();
    const access_token = localStorage.getItem('access_token');
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    }
  
    return this.http.get('http://185.146.86.118:5000/get_prediction/consoles',httpOptions);
  }
    
}
 