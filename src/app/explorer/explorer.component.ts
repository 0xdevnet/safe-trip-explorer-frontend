import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { TrendWatchService } from '../services/trend-watch.service';
import { NotifierService } from 'angular-notifier';
import { MetadataService } from '../services/metadata.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  private readonly notifier: NotifierService;
  public address:string='0x6e49d16e53443c06b86a42c259227464b8987af0';
  public tokens:any = "";
  public dailyVolume:any[]=[];
  public metadata:any = "";
  public liquidity:any = "";
  public trades:any = [];
  public data:boolean = false;

  public sponsors:any[] = this.trendWatch.getSponsorsList();

  constructor(private route:ActivatedRoute, private trendWatch:TrendWatchService, notify:NotifierService, private tokenData:MetadataService,private clipboard:ClipboardService) { 
    
    this.route.params.subscribe(params => {
      if(params.slug != ''){
        this.address = params.slug;
      }
      this.getAllData();
    })
    
    
    this.notifier = notify;

    this.clipboard.copyResponse$.subscribe((res: any) => {
      if (res.isSuccess) {
        this.notifier.notify('success', "Copied To Clipboard");
      }
    });


  }
  
  async getAllData(){
    this.tokenData.getMetadata(this.address, (data:any) =>{
      console.log("Loaded", this.address);
      this.tokens = this.tokenData.tokens;
      this.dailyVolume = this.tokenData.dailyVolume;
      this.metadata = this.tokenData.liquidity;
      this.liquidity = this.tokenData.dailyVolume;
      this.trades = this.tokenData.trades;
      this.data = true;

    })
  }


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


  ngOnInit(): void {
    console.log(this.tokens)

  }
  copyContractAddress(){
    this.clipboard.copy(this.tokens.pair_base_address);
  }

  copyPairAddress(){
    this.clipboard.copy(this.tokens.pair_address);

  }

  

}
