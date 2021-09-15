import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Url {
  networkParam: string = '';

  constructor() {}

  setNetworParam(param: string) {
    this.networkParam = param;
    localStorage.setItem('networkParam', param);
  }

  get metadata_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/metadata/' + param + '/';
  }

  get ohlc_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/safe-trip-chart/' + param + '/';
  }

  get trendlist_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/trending/' + param + '/';
  }

  get sponsoredlist_url() {
    const param = localStorage.getItem('networkParam') || 'bsc';
    return environment.server_url + 'api/tokens/trending/' + param + '/';
  }
}
