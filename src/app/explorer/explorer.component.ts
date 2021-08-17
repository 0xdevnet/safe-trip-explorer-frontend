import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendWatchService } from '../services/trend-watch.service';
import { NotifierService } from 'angular-notifier';
import { MetadataService } from '../services/metadata.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {

  private readonly notifier: NotifierService;
  public address:string='0x6e49d16e53443c06b86a42c259227464b8987af0';
  public tokens:any = "";
  public metadata:any = "";
  public sponsors:any[] = this.trendWatch.getSponsorsList();

  constructor(private route:ActivatedRoute, private trendWatch:TrendWatchService, notify:NotifierService, private tokenData:MetadataService,private clipboard:ClipboardService) { 
    
    this.route.params.subscribe(params => {
      if(params.slug != ''){
        this.address = params.slug;
        this.tokenData.setAddress(this.address);
      }
    })
     
    this.notifier = notify;
    this.loadTokens();
    this.loadMetadata();

    this.clipboard.copyResponse$.subscribe((res: any) => {
      if (res.isSuccess) {
        this.notifier.notify('success', "Copied To Clipboard");
      }
    });
  }

  loadTokens(){
    this.tokenData.getTokens().subscribe(data =>{
      this.tokens = data;
    })
  }

  loadMetadata(){
    this.tokenData.getMetadata().subscribe(data =>{
      this.metadata = data;
    })
  }
  
  copyContractAddress(){
    this.clipboard.copy(this.tokens.pair_base_address);
  }

  copyPairAddress(){
    this.clipboard.copy(this.tokens.pair_address);

  }

  ngOnInit(){

  }

  

}
