import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokensService } from 'src/app/services/tokens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  csvData: any;
  xmlData: any;
  jsonData: any;
  rows: any[] = [];
  columns: string[] = [];
  file_name!: string;
  tokens!: any;
  title = 'market-place-fe';
  selectedFile: File | null = null;
  table: HTMLTableElement | null = null;

  constructor(private router: Router, private http: HttpClient, private token: TokensService) { }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;

    if (files) {
      const allowedTypes = ['text/csv','application/json'];
      const allowedSize = 2000000000;
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      if (file.size > allowedSize) {
        alert('File size is too large. Maximal size is 2GB');
        return;
      }
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
      } else {
        alert('Supported data types: JSON, CSV');
      }
      const reader: FileReader = new FileReader();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        });

      reader.onload = (e: any) => {
        const fileType = file.type;
        const formData = new FormData();
        formData.append('file', file);
        if (fileType === 'text/csv') {
          this.token.checkToken();
          this.http.post('http://185.146.86.118:5000/evaluate_data', formData, {headers: headers}).subscribe((response:any) => {
            localStorage.setItem('file_tokens', response['tokens'])
            this.columns = response['headers'];
            this.rows = response['data'].slice(0,10);
          });
          
        } else if (fileType === 'application/json') {
          this.token.checkToken();
          this.http.post('http://185.146.86.118:5000/evaluate_data', formData, {headers: headers}).subscribe((response:any) => {
            localStorage.setItem('file_tokens', response['tokens'])
            this.columns = response['headers'];
            this.rows = response['data'].slice(0,10);
          });
        }
        else {
          throw("Incompatible file type: " + fileType)
        }
      };
      reader.readAsText(file);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        });
      this.tokens = localStorage.getItem('file_tokens');
      localStorage.removeItem('file_tokens');
      this.file_name = this.selectedFile.name.split('.')[0].toLowerCase();
      const upload_data = {
        "dataset_name": this.file_name,
        "dataset": this.rows,
        "mapping": this.columns.map((column) => column.trim()),
        "tokens": this.tokens,
      }
      this.http.post('http://185.146.86.118:5000/upload_data', upload_data, {headers: headers}).subscribe((response: any) => {
        //alert('Data was uploaded successfully!');
        this.router.navigate(['/view']);
    }, err => {
      alert("Data was not uploaded successfully!");
    });
    }
  }
  
}
