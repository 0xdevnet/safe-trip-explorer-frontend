import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-daily-volume',
  templateUrl: './daily-volume.component.html',
  styleUrls: ['./daily-volume.component.scss']
})
export class DailyVolumeComponent implements OnInit {

  @Input() volume:any[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Daily Volume' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio:1.8,
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
        },
        ticks:{
          padding: 100,
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
  public dailyVolume:any[] = [];
  public lastestVolume:any = "";

  constructor() { 

  }
  ngOnChanges(){
    this.lineChartData[0].data = this.volume.map(day => {
      return day.tradeAmount;
    })
    this.lineChartLabels = this.volume.map(day => {
      return day.timeInterval.day;
    })
    
    if(this.volume.length){
      this.lastestVolume = this.volume[this.volume.length - 1].tradeAmount;

    }
  }

  ngOnInit() {

  }

}
