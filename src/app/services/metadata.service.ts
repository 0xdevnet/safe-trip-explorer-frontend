import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private readonly notifier:NotifierService;

  constructor(private http:HttpClient, notify:NotifierService) {
    this.notifier = notify;
   }

  private metadata_url:string = environment.server_url + "api/tokens/metadata/"
  tokens:any = "";
  dailyVolume:any[]=[];
  metadata:any = "";
  liquidity:any = "";
  trades:any[] = [];

  getMetadata(pairAddress:string, callback:any){
    let url:string = this.metadata_url + pairAddress;
    const headers = {
      }
    this.http.get(url,{headers, responseType:'json', observe:'body'})
    .subscribe({
      next: data=>{
        this.tokens = (data as any).tokens;
        this.dailyVolume = (data as any).dailyVolume;
        this.metadata = (data as any).liquidity;
        this.liquidity = (data as any).dailyVolume;
        this.trades = (data as any).trades;

        callback(data)

      },
      error: error=>{
        this.notifier.notify('error', error.statusText);
        this.notifier.notify('error', "Please Reload And Try Again Later");
      }
    })

    

  }

}
