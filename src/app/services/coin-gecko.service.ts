import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  private headers: any = {
    "accept": "application/json"
  }
  private url: any = "https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/"

  constructor(private http: HttpClient) {

  }

  getInfo(contract: any) {
    return this.http.get(this.url + contract, { headers: this.headers, observe: 'body', responseType: 'json' })
  }
}
