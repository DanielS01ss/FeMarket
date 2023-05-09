import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {TokensService} from "./tokens.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient, private tokenService:TokensService) { }

  fetchPriceData():Observable<any>{
    this.tokenService.checkToken();
    const authToken = localStorage.getItem('access_token');
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json');
    

    return this.http.get('http://185.146.86.118:5000/graph/price',{headers:headers});
  }

  fetchTransactionData():Observable<any>{
    this.tokenService.checkToken();
    const authToken = localStorage.getItem('access_token');
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json');
    
    return this.http.get('http://185.146.86.118:5000/graph/popular',{headers:headers});
  }
}
