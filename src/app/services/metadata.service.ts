import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http:HttpClient, notify:NotifierService) {
      this.notifier = notify;
  }

  private readonly notifier:NotifierService;
  address:string="0x6e49d16e53443c06b86a42c259227464b8987af0";
  private metadata_url:string = environment.server_url + "api/tokens/metadata/"
  private tokens:any = new BehaviorSubject<any>([]);
  private dailyVolume:any = new BehaviorSubject<any>([]);
  private metadata:any = new BehaviorSubject<any>([]);
  private liquidity:any = new BehaviorSubject<any>([]);
  private trades:any = new BehaviorSubject<any>([]);
  private loading:any = new BehaviorSubject<boolean>(false);

  getloading(): Observable<boolean> {
    return this.loading.asObservable();
  }
  setLoading(answer: boolean) {
    this.loading.next(answer);
  }

  getDailyVolume(): Observable<any> {
    return this.dailyVolume.asObservable();
  }
  setDailyVolume(answer: any) {
    this.dailyVolume.next(answer);
  }

  getLiquidity(): Observable<any> {
    return this.liquidity.asObservable();
  }
  setLiquidity(answer: any) {
    this.liquidity.next(answer);
  }

  getTrades(): Observable<any> {
    return this.trades.asObservable();
  }
  setTrades(answer: any) {
    this.trades.next(answer);
  }

  getTokens(): Observable<any> {
    return this.tokens.asObservable();
  }
  setTokens(answer: any) {
    this.tokens.next(answer);
  }

  getMetadata(): Observable<any> {
    return this.metadata.asObservable();
  }
  setMetadata(answer: any) {
    this.metadata.next(answer);
  }
  

  
  setAddress(address:string){
    this.address = address;
    this.getDataAPI();
  }

  getDataAPI(){
    let url:string = this.metadata_url + this.address;
    const headers = {
      }
    this.setLoading(true);
    this.http.get(url,{headers, responseType:'json', observe:'body'})
    .subscribe({
      next: data=>{
        this.setTokens((data as any).tokens)
        this.setMetadata((data as any).details)
        this.setDailyVolume((data as any).dailyVolume)
        this.setLiquidity((data as any).liquidity[0]);
        this.setTrades((data as any).trades);
        this.setLoading(false);

      },
      error: error=>{
        this.notifier.notify('error', error.statusText);
        this.notifier.notify('error', "Please Reload And Try Again Later");
        this.setLoading(false);
      }
    })

    

  }

}
