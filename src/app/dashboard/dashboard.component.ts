import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MetadataService } from '../services/metadata.service';
import { OhlcService } from '../services/ohlc.service';
import { TrendWatchService } from '../services/trend-watch.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private trendWatch: TrendWatchService,
    private ohlc: OhlcService,
    private meta: MetadataService,
    private route: ActivatedRoute
  ) {
    this.meta.setLoading(false);
  }

  public watchList: any[] = this.trendWatch.getWatchList();
  public trendList: any[] = [];
  public latestPrice: any = '';
  public secondPrice: any;
  public upordown: any;

  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Price' }];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#FFF9D2',
      backgroundColor: '#fff08e26',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(async (params) => {
      this.trendList = await this.trendWatch
        .getTrendList()
        .pipe(take(1))
        .toPromise();
      //prevent loading on dashboard
      const res = (await this.ohlc
        .getDashboardOHLCAPI()
        .pipe(take(1))
        .toPromise()) as { data: any };
      const chartData = res.data;

      if (chartData) {
        this.lineChartData[0].data = chartData.map((r: any) => r.close);
        this.lineChartLabels = chartData.map((r: any) => r.timeInterval.minute);
        let len = this.lineChartData[0].data?.length || 0;
        this.latestPrice = this.lineChartData[0].data
          ? this.lineChartData[0].data[len - 1]
          : 0;
        this.secondPrice = this.lineChartData[0].data
          ? this.lineChartData[0].data[len - 2]
          : 0;

        this.secondPrice =
          ((this.latestPrice - this.secondPrice) / this.secondPrice) * 100;
        console.log(this.secondPrice);
        if (this.secondPrice >= 0) {
          this.upordown = 1;
        } else {
          this.upordown = 0;
        }
      }
    });
  }

  removeToken(event: any) {
    let node: any = event.target.parentNode;
    let num: string = node.parentNode.id;

    this.trendWatch.removeWatchListItem(num);
    node.parentNode.parentNode.removeChild(node.parentNode);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
