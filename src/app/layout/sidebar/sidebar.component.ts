import { Component, OnInit } from '@angular/core';
import { Url } from 'src/app/services/url'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private url: Url) {
  }

  ngOnInit(): void {
  }

	clickEthereum() {
		this.url.setNetworParam('ethereum')
	}

	clickBsc() {
		this.url.setNetworParam('bsc')

	}

	clickPolygon() {
		this.url.setNetworParam('matic')
	}
}