import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  datasetName!: string;
  rows: any[] = [];
  columns: string[] = [];
  currentPage: number = 0;
  loading: boolean = true;
  pageSize: number = 3;
  size!:number;
  ngOnInit(): void {
    const dataset_name: any = this.route.snapshot.queryParamMap.get("dataset_name");
    this.datasetName = dataset_name.toUpperCase();
    const author = this.route.snapshot.queryParamMap.get("author");
    if(!dataset_name || !author) {
      this.router.navigate(['not-found']);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json'
    });
    this.tokens.checkToken();
    this.http.get(`http://185.146.86.118:5000/display_snippet?database_name=${author}&database_table=${dataset_name.replace('-db-index', '')}`, {headers: headers}).subscribe((response: any) => {
      const data = response['@list'];
      this.columns = Object.keys(data[0]).map(key => key[0].toUpperCase() + key.slice(1).toLowerCase()).slice(1, 5);
      const int_data = [];
      for (let i of data) {
        int_data.push(Object.values(i).slice(1, 5));
      }
      this.rows = int_data;
      this.size =  Math.ceil((this.rows.length / this.pageSize) - 1);
      this.loading = false;
    }, err => {
      alert("Server is down!");
    });
  }
  constructor(private route:ActivatedRoute, private router: Router, private tokens: TokensService, private http: HttpClient){}

  get slicedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.rows.slice(start, end);
  }

  goToNextPage() {
    this.currentPage++;
  }
  
  goToPreviousPage() {
    this.currentPage--;
  }
}
