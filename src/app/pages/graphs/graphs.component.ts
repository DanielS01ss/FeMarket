import { Component, OnInit } from '@angular/core';
import { ButtonClickedService } from 'src/app/services/button-clicked.service';
import { GraphService } from 'src/app/services/graph.service';
import { ChartConfiguration } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit{

  public barChartLegend = true;
  public barChartPlugins = [];
  title = 'ng2-charts-demo';

  loading = true;
 
  priceData :Array<any>= [];
  popularData :Array<any>= [];
  priceDataLabels:Array<any> = [];
  constructor(private http: HttpClient, private btnClickedService:ButtonClickedService,private graph:GraphService){
    this.btnClickedService.updateClicked(2);
  }
 
   btnClicked:number = 1;
    
   public barChartData?: ChartConfiguration<'bar'>['data'];
   public barCharDataTransaction?:ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    
  };

  ngOnInit(){
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("access_token")}`)
    .set('Content-Type', 'application/json');
    this.http.get('http://185.146.86.118:5000/graph/price',{headers:headers, observe: 'response'}).subscribe((response: any) => {
      for (let i of response.body)
      {
        const int_data = {
          "dataset_name": i.datasetName,
          "price": i.tokens
        }
        this.priceData.push(int_data);
      }
      this.barChartData = {
        labels: [ ...this.priceData.map((elem) => {return elem.dataset_name})],
        datasets: [
          { data: [ ...this.priceData.map((elem)=>{ return elem.price}) ], label: 'Tokens' },
          
        ]
      };
      console.log(this.barChartData)
      this.loading = false;
    }, err => {

    })
 
    this.http.get('http://185.146.86.118:5000/graph/popular',{headers:headers, observe: 'response'}).subscribe((response: any) => {
      console.log(response.body);
      this.popularData = response.body;
      this.barCharDataTransaction = {
        labels: [ ...Object.keys(this.popularData)],
        datasets: [
          { data: [ ...Object.values(this.popularData) ], label: 'Tokens' },
          
        ]
      };
      console.log(this.barCharDataTransaction);
      this.loading = false;
    }, err => {

    })


  }


 
  toggleChange(btnSelectedNr:number){
    this.btnClicked = btnSelectedNr;
  }

  
}
