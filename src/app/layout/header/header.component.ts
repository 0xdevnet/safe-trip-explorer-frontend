import { Component, OnInit, HostListener } from '@angular/core';
import { TrendWatchService } from 'src/app/services/trend-watch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers : [],
})
export class HeaderComponent implements OnInit {

  isMenuDropdown:boolean = false;

  @HostListener('window:resize', ['$event'])  
  onResize() {  
    this.toggleMenu();
  }  
  pairs:any[] = this.trendWatch.getTrendList();

  constructor(private trendWatch: TrendWatchService) { 
    
  }
  public watchList:any[] = this.trendWatch.getWatchList();
  public trendList:any[] = this.trendWatch.getTrendList();

  toggleMenu(){
    if(window.innerWidth > 800){
      this.isMenuDropdown = true;
    }
    else{
      this.isMenuDropdown = false;
    }
  }

  ngOnInit(): void {
    this.toggleMenu();
    console.log(this.watchList)
  }

  async connectWallet(){
    console.log("s")
  }

  removeToken(event:any){
    event.preventDefault();
    let node:any = event.target.parentNode;
    let num:number = parseInt(node.parentNode.id);

    this.trendWatch.removeWatchListItem(num);
    node.parentNode.parentNode.removeChild(node.parentNode);

  }

}
