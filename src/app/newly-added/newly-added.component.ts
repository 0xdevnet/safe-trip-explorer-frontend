import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';

@Component({
  selector: 'app-newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss']
})
export class NewlyAddedComponent implements OnInit {

  constructor(private meta:MetadataService) {
    this.meta.setLoading(false);
   }

  ngOnInit(): void {
  }

}
