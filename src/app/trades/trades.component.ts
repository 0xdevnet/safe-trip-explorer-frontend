import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  @Input() trades:any[] = [];
  public tradesArray:any[] = [];

  constructor() { }

  ngOnChanges(){
    this.tradesArray = this.trades
  }

  ngOnInit(): void {
  }

}
