import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/services/url'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private api: Api) {
  }

  ngOnInit(): void {
  }

	clickEthereum() {
		this.api.setNetworParam('ethereum')
	}

	clickBsc() {
		this.api.setNetworParam('bsc')

	}

	clickPolygon() {
		this.api.setNetworParam('matic')
	}
}