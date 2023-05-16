import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/services/tokens.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
  
})
export class UserProfileComponent implements OnInit {

  rows: any[] = [];
  data: any[] = [];
  username!: string;
  loading: boolean = true;
  email!: string;
  constructor(private router: Router, private http: HttpClient, private token: TokensService){
  }
  ngOnInit(): void {
    this.getTransactions();
    this.createUser();
  }

  private getTransactions(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json'
    });

    this.token.checkToken();
    this.http.get('http://185.146.86.118:5000/get_history', {headers: headers, observe: 'response'}).subscribe((response: any) => {
      for (let i of response.body) {
        const data = {
          "price": i.price,
          "date": i.transactionDate,
          "dataset_name": i.datasetName
        }
        this.data.push(data)
      }
      this.createTable();
    }, (err) =>{
      if (err.status === 500){
        alert(err.message);
      }
    })
  }

  private createUser(){
    const token = localStorage.getItem('access_token')!;
    const decodeToken: any = jwtDecode(token);
    this.email = decodeToken.sub;
    this.username = localStorage.getItem('username')!;
  }

  private createTable(): void {
    for (let i of this.data) {
      this.rows.push([i.dataset_name, i.price, i.date]);
    }
    this.loading = false;
  }

  public updatePassword(): void {
    this.router.navigate(['/pw-change']);
  }

  public deleteAccount(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json'
    });
    this.token.checkToken();
    const token = localStorage.getItem('access_token')!;
    const decodeToken: any = jwtDecode(token);
    const email = decodeToken.sub;
    if (confirm('Are you sure you want to delete this account?')) {
      this.http.delete(`http://185.146.86.118:5000/delete_account/${email}`, {headers: headers, observe: 'response'}).subscribe((response: any) => {
        alert(response.body);
      }, (err) => {
        alert("Operation failed!")
      })
      this.router.navigate(['/sing-in']);
    } else {
      return;
    }
  }

}
