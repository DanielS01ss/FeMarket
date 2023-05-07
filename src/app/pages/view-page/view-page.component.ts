import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokensService } from 'src/app/services/tokens.service';

export interface MetaData {
  Author: string;
  Dataset: string;
  Description: string;
  Size: string;
}

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit {
  query!: string;
  data: any[] = [];
  rows: any[] = [];
  loading = true;
  pageSize = 5;
  currentPage = 0;
  columns: string[] = ['Author', 'Dateset', 'Description', 'Size'];
  size = 0;
  constructor(private router: Router, private http: HttpClient, private token: TokensService) {}
  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    });
    this.token.checkToken();
    this.http.get('http://185.146.86.118:5000/get_all_meta', {
          headers: headers,
          observe: 'response'
        })
        .subscribe((response: any) => {
          for (let i of response.body) {
            const data: any = {
              "Author": i['@context']['@schema'].split('/')[0],
              "Dataset": i['@context']['@schema'].split('/')[1],
              "Description": i['@context']['@schema'].split('/')[1].toUpperCase() + ' Dataset',
              "Size": i['size']
            }
            this.data.push(data);
          }
          this.createTable();
        }, (err) => {
            if (err.status === 500) {
              alert('Not found any datasets with that metadata.')
            }
        });
  }

  public search(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    });

    this.token.checkToken();
    this.loading = true;
    this.data.splice(0, this.data.length)
    if (this.query) {
      this.http.get('http://185.146.86.118:5000/search?query=' + this.query, {
          headers: headers,
          observe: 'response'
        })
        .subscribe((response: any) => {
          for (let i of response.body) {
            const data: any = {
              "Author": i['@context']['@schema'].split('/')[0],
              "Dataset": i['@context']['@schema'].split('/')[1],
              "Description": i['@context']['@schema'].split('/')[1].toUpperCase() + ' Dataset',
              "Size": i['size']
            }
            this.data.push(data);
          }
          this.createTable();
        }, (err) => {
          if (err.status === 500) {
            alert('Not found any datasets with that metadata.')
          }
      });
    }
    else {
      alert('Please enter something in the search box!');
    }
  }

  private createTable(): void {
    this.rows.splice(0, this.rows.length)
    for (let i of this.data) {
      this.rows.push([i.Author, i.Dataset, i.Description, i.Size]);
    }
    this.size =  Math.ceil((this.rows.length / this.pageSize) - 1);
    this.loading = false;
  }

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

  reloadSnippet(row: any) {
    const author = row[0];
    const dataset_name = row[1];

    this.router.navigate(['/snippet'], {
      queryParams: {
        dataset_name: dataset_name,
        author: author
      }
    });
  }
  
}