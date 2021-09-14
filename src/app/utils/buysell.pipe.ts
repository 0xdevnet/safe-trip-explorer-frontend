import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buysell'
})
export class BuysellPipe implements PipeTransform {

  transform(value: any): any {
    if (value == "BUY") {
      return "sell";
    }
    else {
      return "buy";
    }
  }

}
