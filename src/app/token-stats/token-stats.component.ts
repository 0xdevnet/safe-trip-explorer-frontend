import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';

@Component({
  selector: 'app-token-stats',
  templateUrl: './token-stats.component.html',
  styleUrls: ['./token-stats.component.scss']
})
export class TokenStatsComponent implements OnInit {

  volume:any = [];
  liquidity:any = [];
  constructor(private tokenData:MetadataService) { 
    this.loadVolume();
    this.loadLiquidity();
  }

  async resolveLiquidity(){
    console.log("asdasd")
    let pancake_url = "https://api.pancakeswap.info/api/v2/tokens/"

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
