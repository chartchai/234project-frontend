import { Injectable } from '@angular/core';
import { SaleOrder, User } from '../entity/product';
import { Observable } from 'apollo-link';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/observable/of'

@Injectable()
export class GlobalOrderService {
  order:SaleOrder;
  successAdd: boolean;
  user:User;
  constructor() {
    this.resetAll();
   }

   resetAll(){
     this.resetOrder();
     this.successAdd = false;
     this.user = {
       password: '',
       username: '',
       role:''
     };
   }




   resetOrder(){
    this.order = {
			transactions:[]
		} as SaleOrder;
   }

}
