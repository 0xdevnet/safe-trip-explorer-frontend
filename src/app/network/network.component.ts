import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Url } from 'src/app/services/url';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {
  constructor(private route: ActivatedRoute, private url: Url) {}

  ngOnInit(): void {
  }
}
