import { Component, OnInit, HostListener } from '@angular/core';
import { TrendWatchService } from 'src/app/services/trend-watch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
})
export class HeaderComponent implements OnInit {

  isMenuDropdown: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.toggleMenu();
  }
  pairs: any[] = this.trendWatch.getTrendList();

  constructor(private trendWatch: TrendWatchService) {
    this.trendWatch.getTrendList().subscribe((data: any) => {
      this.trendList = data;
    })
  }
  public watchList: any[] = this.trendWatch.getWatchList();
  public trendList: any[] = [];

  toggleMenu() {
    if (window.innerWidth > 800) {
      this.isMenuDropdown = true;
    }
    else {
      this.isMenuDropdown = false;
    }
  }

  ngOnInit(): void {
    this.toggleMenu();
  }

  async connectWallet() {
    console.log("s")
  }

  removeToken(event: any) {
    event.preventDefault();
    let node: any = event.target.parentNode;
    let num: string = node.parentNode.id

    this.trendWatch.removeWatchListItem(num);
    node.parentNode.parentNode.removeChild(node.parentNode);

  }

}
