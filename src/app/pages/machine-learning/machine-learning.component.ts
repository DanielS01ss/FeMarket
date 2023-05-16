import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { MachineLearningService } from 'src/app/services/machine-learning.service';

@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.scss']
})
export class MachineLearningComponent {

  constructor(private machineLearningService:MachineLearningService){
      this.getCPUData();
      this.getGPUData();
      this.getConsolesData();
  }

  ngOnInit(){
    
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData?: ChartConfiguration<'bar'>['data'];
  cpu_data : Array<any> = [];
  cpu_data_headers:Array<any>=[];
  gpu_data : Array<any> = [];
  gpu_data_headers:Array<any> = [];
  consoles_data : Array<any> = [];
  consoles_data_headers : Array<any> = [];
  
  boughtDataSet = true;
  performMachineLearningCalledCPU = false;
  performMachineLearningCalledGPU = false;
  performMachineLearningCalledConsoles = false;
  cpuPageActive = true;
  gpuPageActive = false;
  consolePageActive = false;
  displayGraphCPU = false;
  displayGraphGPU = false;
  displayGraphConsoles = false;
  loading = false;

  

  parseCPUData(){
    const headers = Object.keys(this.cpu_data[0]);
    this.cpu_data_headers = [...headers];
    const allValues:any = [];
    const parsedValues = this.cpu_data.map((cpu)=>{console.log(allValues.push(Object.values(cpu)))})
    this.cpu_data = allValues;
  }

  parseGPUData(){
    const headers = Object.keys(this.gpu_data[0]);
    this.gpu_data_headers = [...headers];
    const allValues:any = [];
    const parsedValues = this.gpu_data.map((gpu)=>{allValues.push(Object.values(gpu))})
    this.gpu_data = allValues;
  }

  parseConsolesData(){
    const headers = Object.keys(this.consoles_data[0]);
    this.consoles_data_headers = [...headers];
    const allValues:any = [];
    const parsedValues = this.consoles_data.map((console)=>{allValues.push(Object.values(console))})
    this.consoles_data = allValues;
  }

  getCPUData(){
    this.machineLearningService.fetchCPUData().subscribe((data)=>{ this.cpu_data = data; console.log(data); this.parseCPUData()},(err)=>{alert("There was an error while trying to fetch data!");})
  }

  getGPUData(){
    this.machineLearningService.fetchGPUData().subscribe((data)=>{ this.gpu_data=data; this.parseGPUData(); },(err)=>{alert("There was an error while trying to fetch data!");})
  }

  getConsolesData(){
    this.machineLearningService.fetchConsolesData().subscribe((data)=>{ this.consoles_data=data; this.parseConsolesData(); },(err)=>{alert("There was an error while trying to fetch data!");})
  }

 toggleConsolePage(){
  this.cpuPageActive = false;
  this.gpuPageActive = false;
  this.consolePageActive = true;

 }

 toggleGPUPage(){
  this.cpuPageActive = false;
  this.gpuPageActive = true;
  this.consolePageActive = false;
 }

 toggleCPUPage(){
  this.cpuPageActive = true;
  this.gpuPageActive = false;
  this.consolePageActive = false;
 }

 handlePerformMachineLearningCPU(){
  this.performMachineLearningCalledCPU = true;

  
 }

 handlePerformMachineLearningGPU(){
  this.performMachineLearningCalledGPU = true;
 }

 handlePerformMachineLearningConsoles(){
  this.performMachineLearningCalledConsoles = true;
 }

  toggleDisplayGraphGPU(){
    this.displayGraphGPU = !this.displayGraphGPU;
  }

  toggleDisplayGraphCPU(){
    this.displayGraphCPU = !this.displayGraphCPU;
  }

  toggleDisplayGraphConsoles(){
    this.displayGraphConsoles = !this.displayGraphConsoles;
  }
}
