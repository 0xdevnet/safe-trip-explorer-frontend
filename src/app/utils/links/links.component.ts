import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor() { }
  @Input() data:any;
  @Input() tokens:any;
  @Input() coinLoaded:boolean = false;

  ngOnInit(): void {

  }

}
