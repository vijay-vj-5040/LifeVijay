import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { DashBoardService } from '../common/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'name', 'age', 'sex','phoneno','testDetails','location'];
  dataSource ;
  constructor(
    protected dashboardService:DashBoardService
  ) { }
  
  
  pending:number;
  inprogress:number;
  rejected:number;
  approved:number;
  completed:number;
  datalabels;
  data

  ngOnInit(): void {


    this.dashboardService.dashboard().subscribe(testresult=>{
      this.approved = testresult.data.approved;
      this.inprogress = testresult.data.inprogress;
      this.pending = testresult.data.pending;
      this.rejected = testresult.data.rejected;
      this.completed = testresult.data.completed;
      this.datalabels =testresult.data.chartData;
      this.data =testresult.data.legends;
      this.dataSource = testresult.data.orderTable;
      this.chartDataLoad();
    })
   
  }
  chartDataLoad(){
    var context = new Chart(document.getElementById("doughnut-chart") as HTMLCanvasElement, {
      type: 'doughnut',
      
      data: {
        labels: this.datalabels,      
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#4caf50", "#f27e0b","#ffc300","#ff5252","#2196f3"],
            data: this.data,
            weight:400,
            radius:50,            
          }
        ]
      },    
      options: {        
        maintainAspectRatio :true,
        responsive: true,
        legend:{
          labels:{
            fontFamily:'Poppins',
            fontSize:12,
            boxWidth:12
          },position:'bottom'
        },
        
      }
  });
  }

}
