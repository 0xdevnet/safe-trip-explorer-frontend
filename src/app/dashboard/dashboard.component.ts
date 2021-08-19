import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color,Label } from 'ng2-charts';
import { OhlcService } from '../services/ohlc.service';
import { TrendWatchService } from '../services/trend-watch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private trendWatch:TrendWatchService, private ohlc:OhlcService) { 
    this.trendWatch.getTrendList().subscribe((data:any) => {
      this.trendList = data;
    })

    
    this.ohlc.getDashboardOHLCAPI()
    .subscribe(
      {
        next: next=>{
          this.lineChartData[0].data = (next as any).data.map((data:any) =>{
            return data.close
          })
          this.lineChartLabels = (next as any).data.map((data:any) =>{
            return data.timeInterval.minute
          })
          let len = this.lineChartData[0].data?.length || 0;
          if(len){
            this.latestPrice = this.lineChartData[0].data ? this.lineChartData[0].data[len - 1] : 0
            this.secondPrice = this.lineChartData[0].data ? this.lineChartData[0].data[len - 2] : 0

            this.secondPrice = ((this.latestPrice - this.secondPrice)/this.secondPrice)*100
            console.log(this.secondPrice)
            if(this.secondPrice >= 0){
              this.upordown = 1
            }
            else{
              this.upordown = 0
            }
          }

        },
        error: error =>{
          console.error("ERROR, OHLC Daily data error")
        }
      }
    )
  }

  public watchList:any[] = this.trendWatch.getWatchList();
  public trendList:any[] = [];
  public latestPrice:any="";
  public secondPrice:any;
  public upordown:any

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Price' },
  ];
  public lineChartLabels: Label[] = [];

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

  ngOnInit(): void {
    
  }

  removeToken(event:any){
    let node:any = event.target.parentNode;
    let num:string = node.parentNode.id;

    this.trendWatch.removeWatchListItem(num);
    node.parentNode.parentNode.removeChild(node.parentNode);

  }

}
