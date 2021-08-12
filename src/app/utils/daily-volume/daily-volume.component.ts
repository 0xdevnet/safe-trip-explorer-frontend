import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-daily-volume',
  templateUrl: './daily-volume.component.html',
  styleUrls: ['./daily-volume.component.scss']
})
export class DailyVolumeComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio:2,
    scales: {
      xAxes: [{
      display:false,
      gridLines: {
        display:false,
        }
      }],
      yAxes: [{
        display:false,
        gridLines: {
          display:false,
        }   
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#FFF9D2',
      backgroundColor: '#fff08e26',
    },
    
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
