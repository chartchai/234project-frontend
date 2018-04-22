import { Component, OnInit } from '@angular/core';
import { SaleOrder, SaleTransaction } from '../../entity/product';
import { Transaction } from 'apollo-cache';
import { OrderService } from '../../service/order.service';
import { GlobalOrderService } from '../../service/global-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService
    , private globalOrderService: GlobalOrderService
    , private router: Router) { }
  orders: [SaleOrder];

  isAdmin() {
    return this.globalOrderService.user.role === 'admin';
  }

  isUser() {
    return this.globalOrderService.user.role === 'user';
  }
  ngOnInit() {
    if (!(this.isAdmin() )) {
      this.router.navigate(['/']);
    }
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res.data.saleOrders;
      }
    );

  }

  getTotalPrice() {
    return this.orders.reduce((previous, current) => {
      return previous + current.totalPrice;
    }, 0)
  }
  getProductNames(transactions: [SaleTransaction]) {
    let nameList: string = transactions.reduce((previous, current) => {
      return previous + current.product.name + ', ';
    }
      , '');
    return nameList.substr(0, nameList.length - 2);

  }

}
