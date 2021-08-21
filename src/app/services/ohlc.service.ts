import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OhlcService {

  constructor(private http:HttpClient) { 
    
  }

  getDashboardOHLCAPI(){
    const headers = {
    }
    let url = environment.server_url + "api/tokens/safe-trip-chart"
    return this.http.get(url,{headers, responseType:'json', observe:'body'})
    
  }


}
