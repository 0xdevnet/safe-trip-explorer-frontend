import { HttpClient } from '@angular/common/http';
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
    let url = environment.server_url + "api/tokens/chartdata/?base=0xe3916a4dc3c952c78348379a62d66869d9b59942&quote=0xe9e7cea3dedca5984780bafc599bd69add087d56&resolution=1440"
    return this.http.get(url,{headers, responseType:'json', observe:'body'})
    
  }

  getOHLCAPI(url:string){
    const headers = {
      }

    this.http.get(url,{headers, responseType:'json', observe:'body'})
    .subscribe({
      next: data=>{


      },
      error: error=>{

      }
    })
  }

}
