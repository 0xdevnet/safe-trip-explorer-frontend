import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MetadataService } from '../services/metadata.service';
import { TrendWatchService } from '../services/trend-watch.service';

@Component({
  selector: 'app-token-stats',
  templateUrl: './token-stats.component.html',
  styleUrls: ['./token-stats.component.scss']
})
export class TokenStatsComponent implements OnInit {

  @Input() coinData:any;
  @Input() coinLoaded:any;

  volume:any = [];
  liquidity:any = [];
  isSaved:any = false;
  public tokens:any = "";
  modal:any="";
  details:any = [];

  private tokenSub:any;
  private readonly notifier:NotifierService;
  latestPrice:any = ""
  hourlyChange:any;
  dailyChange:any;
  upordown:boolean = true
  truncatePrice:boolean = false;
  totalSupply:any = "???"
  pancakeLoaded:boolean = false;
  pancakeBase:any=""
  pancakeQuote:any=""
  totalLiquidity:any="???"
  dilutedCap:any="???"

  constructor(
    private tokenData:MetadataService, 
    private trendWatch:TrendWatchService, 
    private modalService:NgbModal,
    private notify:NotifierService) { 
    
    this.notifier = notify;
    this.loadVolume();
    this.tokenSub = this.tokenData.getTokens().subscribe(data =>{
        this.tokens = data;
        this.checkSavedToken()
        this.getLatestPrice()
        this.loadLiquidity();
    })
    this.tokenData.getMetadata().subscribe(data =>{
      this.details = data

    })
    
  }

  async resolveLiquidity(){
    let pancake_url = "https://api.pancakeswap.info/api/v2/tokens/"

    try{
      const baseRes = await axios.get(pancake_url+this.tokens.pair_base_address)
      const quoteRes = await axios.get(pancake_url+this.tokens.pair_quote_address)
      this.pancakeLoaded = true;
      this.pancakeBase = Number(baseRes.data.data.price)
      this.pancakeQuote = Number(quoteRes.data.data.price)

      this.pancakeBase = this.pancakeBase < 0.0000001 ? this.pancakeBase : this.pancakeBase.toFixed(6)
      this.pancakeQuote = this.pancakeQuote < 0.0000001 ? this.pancakeQuote : this.pancakeQuote.toFixed(6)
    }
    catch(error){
      this.pancakeLoaded = false;
      this.notifier.notify("error", "Could Not Fetch Recent Prices")
    }


    let a,b;

    if(this.liquidity.balances[0].currency.address === this.tokens.pair_base_address){
      a = (this.pancakeBase * this.liquidity.balances[0].value)
    }
    else{
      a = (this.pancakeBase * this.liquidity.balances[1].value)
    }
    if(this.liquidity.balances[1].currency.address === this.tokens.pair_quote_address){
      b = (this.pancakeQuote * this.liquidity.balances[1].value)
    }
    else{
      b = (this.pancakeQuote * this.liquidity.balances[0].value)
    }

    this.totalLiquidity = "$" + ((a + b).toFixed(3))

    let decimal = 1, supply = 1;
    for(let attr of this.details[0].smartContract.attributes){
      if(attr.name.toLowerCase() == "decimals"){
        decimal = Number(attr.value)
      }
      if(attr.name.toLowerCase() == "totalsupply" || attr.name.toLowerCase() == "maxsupply"){
        supply = Number(attr.value)
        
      }
    } 
    decimal = decimal == 1 ? 18 : decimal
    let s = "1"
    for(var i=0 ;i<decimal;i++){
      s += "0"
    }
    if(supply != 1){
      let num = Math.round(supply / Number(s))
      this.totalSupply = this.numberToHuman(num)
      let cap = Math.round((num) * Number(this.pancakeBase))
      this.dilutedCap = "$" + this.numberToHuman(cap);
      
    }
    

  }

  openAdditionalInfo(info:any){
    this.modal = this.modalService.open(info,{ size: 'lg' });
  }

  checkSavedToken(){
    let tokens:any = this.trendWatch.getWatchList();
    for(var i=0;i<tokens.length;i++){
      if(tokens[i].address == this.tokenData.address){
        this.isSaved = true;
      }
    }
  }

  saveToken(){
    if(this.isSaved == false){
      this.notifier.notify('success', "Token Added To Watchlist")
      this.trendWatch.setWatchList(this.tokens.pair_address, this.tokens.pair_base_name,this.tokens.pair_quote_name)
      this.isSaved = true;
    }
    else{
      this.notifier.notify('warning', "Token Removed From Watchlist")
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

  async getLatestPrice(){
    try{
      let params = {
        'resolution' : 60,
        'count' : 10,
        'till': Math.round(Date.now() / 1000),
        'base' : this.tokens.pair_base_address,
        'quote' : this.tokens.pair_quote_address
      }
      const url = environment.server_url + "api/tokens/chartdata/"
      const response2 = await axios.get(url, {params:params})

      let data = response2.data.data;
      this.latestPrice = Number(data[data.length - 1].close)
      let lastclose = Number((data[data.length - 2].close))
      this.hourlyChange = ((this.latestPrice - lastclose)/lastclose)*100
      this.upordown = this.hourlyChange >=0 ? true : false

      this.truncatePrice = this.latestPrice < 0.0000001 ? true : false
      this.resolveLiquidity()
    }
    catch(error){
    }
      
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.tokenSub.unsubscribe();
  }

  numberToHuman(labelValue:number){
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9

      ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6

      ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3

      ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

      : Math.abs(Number(labelValue));
  }
  readMore() {
  var dots:any = document.getElementById("dots");
  var moreText:any = document.getElementById("more");
  var btnText:any = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

}
