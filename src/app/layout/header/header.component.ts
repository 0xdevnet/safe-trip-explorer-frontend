import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers : [],
})
export class HeaderComponent implements OnInit {

  isMenuDropdown:boolean = false;

  @HostListener('window:resize', ['$event'])  
  onResize() {  
    this.toggleMenu();
  }  
  pairs:any[] = [
    {
    'target_currency_short_name': 'MoonDoge',
    'price':'0.482'
    },
    {
    'target_currency_short_name': 'SafeTrip',
    'price':'0.482'
    },
    {
    'target_currency_short_name': 'BTT', 
    'price':'0.482'
    },
    {
      'target_currency_short_name': 'BTT', 
      'price':'0.482'
      },
      {
        'target_currency_short_name': 'BTT', 
        'price':'0.482'
        },
        {
          'target_currency_short_name': 'BTT', 
          'price':'0.482'
          },
          {
            'target_currency_short_name': 'BTT', 
            'price':'0.482'
            },
            {
              'target_currency_short_name': 'BTT', 
              'price':'0.482'
              },
              {
                'target_currency_short_name': 'BTT', 
                'price':'0.482'
                },
                {
                  'target_currency_short_name': 'BTT', 
                  'price':'0.482'
                  },
                                                            
  ]

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

  async connectWallet(){
    console.log("s")
  }

}
