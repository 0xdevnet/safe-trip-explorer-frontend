import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrendWatchService {

  constructor() {
    //this.watchList= JSON.parse(window.localStorage.getItem("watchlist") || '[]');
   }

  private sponsorList:any[] = [
    {
      'name': 'MoonDoge',
      'desc':'lorem DEFI INTELLIGENT AUTOMATION PLATFORM A multi-product ecosystem of the qpic crypto eco space like this is the shit',
      'logo_url' : 'https://image.pngaaa.com/186/326186-middle.png',
      'link' : 'https://google.com/'
    },
    {
      'name': 'MoonDoge 2',
      'desc':'lorem DEFI INTELLIGENT AUTOMATION PLATFORM A multi-product ecosystem of the qpic crypto eco space like this is the shit',
      'logo_url' : 'https://image.pngaaa.com/186/326186-middle.png',
      'link' : 'https://google.com/'
    },
    {
      'name': 'MoonDoge 3',
      'desc':'lorem SISIJISSIIISISISI crypto eco space like this is the shit',
      'logo_url' : 'https://image.pngaaa.com/186/326186-middle.png',
      'link' : 'https://google.com/'
    },
  ]

  private trendList:any[] = [
    {
      'id' : 0,
      'name': 'MoonDoge',
      'price':'0.482'
    },
    {
      'id' : 1,
      'name': 'Safe Trip',
      'price':'0.482'
    },
    {
      'id' : 2,
      'name': 'Rockesd Token',
      'price':'0.482'
    },
    {
      'id' : 3,
      'name': 'Shib Inu',
      'price':'0.0000482'
    },
    {
      'id' : 3,
      'name': 'Shib Inu',
      'price':'0.482'
    },
    {
      'id' : 3,
      'name': 'Shib Inu',
      'price':'0.482'
    },
    {
      'id' : 3,
      'name': 'Shib Inu',
      'price':'0.482'
    },

  ]

  private watchList:any[] = [
    {
      'id' : 0,
      'name' : 'sike',
      'price' : '01.412'
    },
    {
      'id' : 1,
      'name' : 'Big Ass Name',
      'price' : '2.87723'
    },
  ]

  getTrendList():any{
    return this.trendList;
  }

  setWatchList(){

  }

  removeWatchListItem(id:number){
    let i = 0;
    for(i=0;i<this.watchList.length;i++){
      if(this.watchList[i].id === id){
        console.log(id)
        this.watchList.splice(i, 1);
        break;
      }
    }
  }

  getWatchList(){
    return this.watchList;
  }

  getSponsorsList(){
    return this.sponsorList;
  }

}
