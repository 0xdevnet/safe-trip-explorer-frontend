import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendWatchService } from '../services/trend-watch.service';
import { NotifierService } from 'angular-notifier';
import { MetadataService } from '../services/metadata.service';
import { ClipboardService } from 'ngx-clipboard';
import { CoinGeckoService } from '../services/coin-gecko.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  private readonly notifier: NotifierService;
  public address: string = '0x6e49d16e53443c06b86a42c259227464b8987af0';
  public tokens: any = '';
  public metadata: any = '';
  public coinData: any;
  public coinLoaded: boolean = false;

  sub: Subscription = new Subscription();

  private sub1: any;
  private sub2: any;
  private sub3: any;

  constructor(
    private route: ActivatedRoute,
    notify: NotifierService,
    private tokenData: MetadataService,
    private clipboard: ClipboardService,
    private coinGecko: CoinGeckoService
  ) {
    this.notifier = notify;
  }

  loadTokens() {
    this.sub2 = this.tokenData.getTokens().subscribe((data) => {
			this.tokens = data;
			console.log("this.tokens?", this.tokens)
      this.coinGecko.getInfo(this.tokens.pair_base_address).subscribe({
        next: (next) => {
          this.coinData = next;
          this.coinLoaded = true;
					console.log("coinLoaded?", this.coinLoaded)
        },
        error: (error) => {
          this.coinLoaded = false;
					console.log("coinLoaded?", this.coinLoaded)

        },
      });
    });
  }

  loadMetadata() {
    this.sub3 = this.tokenData.getMetadata().subscribe((data) => {
      this.metadata = data;
    });
  }

  copyContractAddress() {
    this.clipboard.copy(this.tokens.pair_base_address);
  }

  copyPairAddress() {
    this.clipboard.copy(this.tokens.pair_address);
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(async (params) => {
			console.log("params??", params)
      if (params.address != '') {
        this.address = params.address;
        console.log('this.address?', this.address);
        this.tokenData.setAddress(this.address);
      }

      // this.notifier = notify;
      this.loadTokens();
      this.loadMetadata();

      this.sub1 = this.clipboard.copyResponse$.subscribe((res: any) => {
        if (res.isSuccess) {
          this.notifier.notify('success', 'Copied To Clipboard');
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
