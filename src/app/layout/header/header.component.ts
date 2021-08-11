import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuDropdown:boolean = false;

  @HostListener('window:resize', ['$event'])  
  onResize() {  
    this.toggleMenu();
  }  


  constructor() { 
    
  }

  toggleMenu(){
    if(window.innerWidth > 800){
      this.isMenuDropdown = true;
    }
    else{
      this.isMenuDropdown = false;
    }
  }

  ngOnInit(): void {
    this.toggleMenu();
  }

}
