import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpClient,private modalService: NgbModal, private router:Router,notify:NotifierService) {
    this.notifier = notify;
   }
  public url:string = environment.server_url + "api/tokens/search/";
  value:string = "";
  result:any=[];
  isLoading:any = true;
  modal:any = "";
  private readonly notifier: NotifierService;

  ngOnInit(): void {
  }

  navigate(event:any){
    console.log(event)
    let st = "/explorer/" + event
    this.modalService.dismissAll()
    this.router.navigate([st])
   
  }


  searchToken(content:any){
    if(this.value == ""){
      return;
    }
    this.isLoading = true;
    this.modal = this.modalService.open(content)
    let params = new HttpParams().set("value",this.value)
    this.http.get(this.url, {headers: {}, params: params})
    .subscribe({
      next:next=>{
        this.result = (next as any).data.ethereum.dexTrades;
        console.log(this.result)
        this.isLoading = false;
      },
      error:error=>{
        this.notifier.notify("error", "There Has Been An Error! Please Try Again Later")
      }
    }) 

  }

}
