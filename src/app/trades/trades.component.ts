import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  trades:any = [];

  constructor(private tokenData:MetadataService) {
    this.loadTrades();
   }

  loadTrades(){
    this.tokenData.getTrades().subscribe(data => {
      this.trades = data;
    })
  }

  ngOnInit(): void {
  }

}
