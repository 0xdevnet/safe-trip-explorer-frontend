import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from './url';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  private headers: any = {
    "accept": "application/json"
  }

  constructor(private http: HttpClient, private url: Url) {

  }

  getInfo(contract: any) {
    return this.http.get(this.url.coingecko_url + contract, { headers: this.headers, observe: 'body', responseType: 'json' })
  }
}
