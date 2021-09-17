import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from 'src/app/services/url';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	network: string = 'bsc'

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private url: Url
  ) {}

  ngOnInit(): void {
		// console.log("activeRoute?", activeRoute)
	}

  clickDashboard() {
    this.router.navigate(['dashboard'], { queryParams: { network: this.network }});
  }

	clickExplorer() {
		let address;
		if(this.network === 'ethereum') {
			address = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852'
		} else if (this.network === 'bsc') {
			address = '0x6e49d16e53443c06b86a42c259227464b8987af0'
		} else {
			address = '0xadbf1854e5883eb8aa7baf50705338739e558e5b'
		}

		this.router.navigate(['explorer'], { queryParams: { network: this.network, address: address }});
  }

  clickEthereum() {
		this.network = 'ethereum';
    this.url.setNetworkParam(this.network);
    this.router.navigate([], { queryParams: { network: 'ethereum' } });
  }

  clickBsc() {
		this.network = 'bsc';
    this.url.setNetworkParam(this.network);
    this.router.navigate([], { queryParams: { network: 'bsc' } });
  }

  clickPolygon() {
		this.network = 'matic';
    this.url.setNetworkParam(this.network);
    this.router.navigate([], { queryParams: { network: 'matic' } });
  }
}
