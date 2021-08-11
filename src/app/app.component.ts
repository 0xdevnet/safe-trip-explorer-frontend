import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'safe-trip-frontend';
  isMenuOpen:boolean = false;

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Menu : ", this.isMenuOpen)
  }
}
