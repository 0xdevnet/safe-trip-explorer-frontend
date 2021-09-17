import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Url {
  networkParam: string = '';

  constructor() {}

  setNetworkParam(param: string) {
    this.networkParam = param;
    localStorage.setItem('networkParam', param);
  }

  get metadata_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/metadata/' + param + '/';
  }

  get ohlc_url() {
    return environment.server_url + 'api/tokens/safe-trip-chart/';
  }

  get trendlist_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/trending/' + param + '/';
  }

  get sponsoredlist_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/trending/' + param + '/';
  }

  get coingecko_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    if (param === 'bsc')
      return 'https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/';
    else if (param === 'ethereum')
      return 'https://api.coingecko.com/api/v3/coins/ethereum/contract/';
    else return 'https://api.coingecko.com/api/v3/coins/polygon-pos/contract/';
  }
}
