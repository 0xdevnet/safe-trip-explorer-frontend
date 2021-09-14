import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OhlcService {

  constructor(private http: HttpClient) {

  }
  private bars: any = new BehaviorSubject<any>([]);

  getDashboardOHLCAPI() {
    const headers = {
    }
    let url = environment.server_url + "api/tokens/safe-trip-chart"
    return this.http.get(url, { headers, responseType: 'json', observe: 'body' })

  }
  setBars(answer: any) {
    this.bars.next(answer);
  }

  getBars() {
    return this.bars.asObservable();
  }


}
