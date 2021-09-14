import { Component } from '@angular/core';

import { MetadataService } from './services/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'safe-trip-frontend';
  isMenuOpen: boolean = false;
  isLoading: any = false;

  constructor(private data: MetadataService) {
    this.load();
  }

  load() {
    this.data.getloading().subscribe(load => {
      this.isLoading = load;
    })
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Menu : ", this.isMenuOpen)
  }
}
