import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from 'src/app/services/url';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private url: Url
  ) {}

  ngOnInit(): void {}

  clickDashboard() {
    const networkParams = this.url.networkParam;
    this.router.navigate([networkParams + '/dashboard']);
  }

  async clickEthereum() {
    this.url.setNetworkParam('ethereum');
    this.router.navigate([], { queryParams: { network: 'ethereum' } });
  }

  clickBsc() {
    this.url.setNetworkParam('bsc');
    this.router.navigate([], { queryParams: { network: 'bsc' } });
  }

  clickPolygon() {
    this.url.setNetworkParam('matic');
    this.router.navigate([], { queryParams: { network: 'matic' } });
  }
}
