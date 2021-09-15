import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Url } from './url';

@Injectable({
  providedIn: 'root',
})
export class OhlcService {
  constructor(private http: HttpClient, private url: Url) {}
  private bars: any = new BehaviorSubject<any>([]);

  getDashboardOHLCAPI() {
    const headers = {};
    return this.http.get(this.url.ohlc_url, {
      headers,
      responseType: 'json',
      observe: 'body',
    });
  }
  setBars(answer: any) {
    this.bars.next(answer);
  }

  getBars() {
    return this.bars.asObservable();
  }
}
