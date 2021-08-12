import { Component, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    const box:any = document.getElementById('siksisk');
    const chart = createChart(box, { width: 700, height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ]);

    lineSeries.applyOptions({
      color: '#27AE60',
      lineWidth: 2,
    });
    
    chart.applyOptions({
      layout: {
        backgroundColor: 'rgb(0,0,0,0)',
        textColor: '#d1d4dc',
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      }
    });
    
  }

}
