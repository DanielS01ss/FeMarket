import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ButtonClickedService } from 'src/app/services/button-clicked.service';

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
  title = 'market-place-fe';
  selectedFile: File | null = null;
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files) {
      const allowedTypes = ['text/csv', 'text/xml', 'application/json'];
      const allowedSize = 2000000000;
      const file = files[0];
      if (file.size>allowedSize){
        alert('File size is too large. Maximal size is 2GB');
        return;
      }
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
      } else {
        alert('Supported data types: JSON, CSV, XML');
      }
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const fileType = file.type;
        if (fileType === 'text/csv') {

          const csv: string = e.target.result;
          console.log(csv);
          this.parseCsv(csv);
        } else if (fileType === 'application/json') {
          const json: string = e.target.result;
          this.parseJson(json);
        }
      };
      reader.readAsText(file);
    }
  }
  onUpload(): void {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      console.log(this.selectedFile.name);
    }
  }

  parseCsv(csv: string): void {
    const papa: Papa = new Papa();
    const parsedCsv = papa.parse(csv);
    this.columns = parsedCsv.data[0];
    this.rows = parsedCsv.data.slice(1);
  }



  parseJson(json: string): void {
    const result = JSON.parse(json);
    const keys = Object.keys(result?.data?.[0] || {});
    this.columns = keys;
    this.rows = (result.data || []).map((item: any) => Object.assign({}, item));
  }  

  constructor(private http: HttpClient, private btnClickedService:ButtonClickedService) {
    this.btnClickedService.updateClicked(3);
   }
  
}
