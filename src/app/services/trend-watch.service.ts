import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';


let headers = {

}
let trendlist_url = environment.server_url + "api/tokens/trending/"
let sponsoredlist_url = environment.server_url + "api/tokens/sponsored/"

@Injectable({
  providedIn: 'root'
})
export class TrendWatchService {

  private readonly notifier: NotifierService;
  constructor(private http: HttpClient, private notify: NotifierService) {
    this.notifier = notify;
    this.watchList = JSON.parse(window.localStorage.getItem("watchlist") || '[]');

    this.http.get(trendlist_url, { headers, responseType: 'json', observe: 'body' })
      .subscribe(
        {
          next: data => {
            this.setTrendList((data as any))

          },
          error: error => {
            this.notifier.notify('error', "There Has Been An Error While Fetching Trending Tokens")
          }
        }
      )
    this.http.get(sponsoredlist_url, { headers, responseType: 'json', observe: 'body' })
      .subscribe(
        {
          next: data => {
            this.setSponsorList((data as any))
          },
          error: error => {
            this.notifier.notify('error', "There Has Been An Error While Fetching Sponsored Tokens")
          }
        }
      )

  }

  private sponsorList: any = new BehaviorSubject<any>([]);
  private trendList: any = new BehaviorSubject<any>([]);
  private watchList: any = [

  ]

  getTrendList() {
    return this.trendList.asObservable();
  }

  setTrendList(answer: any) {
    this.trendList.next(answer);
  }

  getSponsorList() {
    return this.sponsorList.asObservable();
  }
  setSponsorList(answer: any) {
    this.sponsorList.next(answer);
  }


  setWatchList(addr: string, base_name: string, quote_name: string) {
    let obj = {
      "address": addr,
      "base_name": base_name,
      "quote_name": quote_name,
    }
    this.watchList[this.watchList.length] = obj;

    window.localStorage.setItem("watchlist", JSON.stringify(this.watchList))
  }

  removeWatchListItem(addr: string) {
    let i = 0;
    for (i = 0; i < this.watchList.length; i++) {
      if (this.watchList[i].address === addr) {
        this.watchList.splice(i, 1);
        break;
      }
    }
    window.localStorage.setItem("watchlist", JSON.stringify(this.watchList))
  }

  getWatchList() {
    return this.watchList;
  }

}
