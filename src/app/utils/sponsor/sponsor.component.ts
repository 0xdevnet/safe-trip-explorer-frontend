import { Component, OnInit } from '@angular/core';
import { TrendWatchService } from 'src/app/services/trend-watch.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  sponsors:any = [];
  constructor(private trendWatch:TrendWatchService) { 
    this.trendWatch.getSponsorList().subscribe((data:any) => {
      this.sponsors = data;
    })
  }

  ngOnInit(): void {
  }

}
