import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() 
    {
    }

  ngOnInit(): void {
  }
}
