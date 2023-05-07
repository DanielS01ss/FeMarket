import { Component } from '@angular/core';
import { ButtonClickedService } from 'src/app/services/button-clicked.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent {
  constructor(private btnClickedService:ButtonClickedService){
    this.btnClickedService.updateClicked(2);
  }

   btnClicked:number = 1;

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];
 
  toggleChange(btnSelectedNr:number){
    this.btnClicked = btnSelectedNr;
  }

  
}
