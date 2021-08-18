import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';
import { TrendWatchService } from '../services/trend-watch.service';

@Component({
  selector: 'app-token-stats',
  templateUrl: './token-stats.component.html',
  styleUrls: ['./token-stats.component.scss']
})
export class TokenStatsComponent implements OnInit {

  volume:any = [];
  liquidity:any = [];
  isSaved:any = false;
  public tokens:any = "";
  constructor(private tokenData:MetadataService, private trendWatch:TrendWatchService) { 
    this.loadVolume();
    this.loadLiquidity();
    this.tokenData.getTokens().subscribe(data =>{
      this.tokens = data;
      this.checkSavedToken()
    })
    
  }

  async resolveLiquidity(){
    console.log("asdasd")
    let pancake_url = "https://api.pancakeswap.info/api/v2/tokens/"

  }

  checkSavedToken(){
    let tokens:any = this.trendWatch.getWatchList();
    console.log(tokens)
    for(var i=0;i<tokens.length;i++){
      if(tokens[i].address == this.tokenData.address){
        this.isSaved = true;
      }
    }
  }

  saveToken(){
    if(this.isSaved == false){
      this.trendWatch.setWatchList(this.tokens.pair_address, this.tokens.pair_base_name,this.tokens.pair_quote_name)
      this.isSaved = true;
    }
    else{
      this.trendWatch.removeWatchListItem(this.tokens.pair_address)
      this.isSaved = false;
    }
  }

  loadVolume(){
    this.tokenData.getDailyVolume().subscribe(data =>{
      this.volume = data;
    })
  }

  loadLiquidity(){
    this.tokenData.getLiquidity().subscribe(data =>{
      this.liquidity = data;
    })
  }

  ngOnInit(): void {
  }

}
