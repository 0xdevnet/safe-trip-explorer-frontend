import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';
import * as moment from 'moment';


@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  trades: any = [];

  constructor(private tokenData: MetadataService) {
    this.loadTrades();
  }

  loadTrades() {
    this.tokenData.getTrades().subscribe(data => {
      this.trades = data.map((data: any) => {

        var d = moment(data.block.timestamp.time)
        var utcOffset = moment().utcOffset();
        var local_time = d.add(utcOffset, "minutes");
        let obj = {
          "date": local_time.fromNow(),
          "block": data.block.height,
          "type": "",
          "usd": data.tradeAmount,
          "buyOrSell": 0,
          "buySymbol": data.buyCurrency.symbol,
          "sellSymbol": data.sellCurrency.symbol,
          "price": 0,
          "buy": "",
          "sell": "",
          "maker": data.taker.address,
          "hash": data.transaction.hash,
        }
        if (data.side == "SELL") {
          obj.type = "SELL";
          obj.price = (data.price),
            obj.buyOrSell = 0;
          obj.buy = data.buyAmount;
          obj.sell = data.sellAmount;
        }
        else {
          obj.type = "BUY";
          obj.price = 1 / parseFloat(data.price),
            obj.buyOrSell = 1;
          obj.buy = data.sellAmount;
          obj.sell = data.buyAmount;
        }
        return obj;
      })
    })


  }

  ngOnInit(): void {
  }

}
