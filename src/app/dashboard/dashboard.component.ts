import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TrendWatchService } from '../services/trend-watch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private trendWatch:TrendWatchService) { }

  public watchList:any[] = this.trendWatch.getWatchList();
  public trendList:any[] = this.trendWatch.getTrendList();

  public lineChartData: ChartDataSets[] = [
    { data: [10, 20, 5, 25, 40 ,30, 23, 50, 30, 60, 65, 59, 80, 81, 56, 55, 40], label: 'Price' },
  ];


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

  ngOnInit(): void {
    
  }

  removeToken(event:any){
    let node:any = event.target.parentNode;
    let num:number = parseInt(node.parentNode.id);

    this.trendWatch.removeWatchListItem(num);
    node.parentNode.parentNode.removeChild(node.parentNode);

  }

}
