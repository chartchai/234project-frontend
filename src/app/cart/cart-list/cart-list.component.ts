import { Component, OnInit } from '@angular/core';
import { SaleOrder } from '../../entity/product';
import { ProductListComponent } from '../../product/list/list.component';
import { GlobalOrderService } from '../../service/global-order.service';
import { DecimalPipe } from '@angular/common';
import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor(private globalOrder: GlobalOrderService, 
    private decimalPipe: DecimalPipe, 
    private orderService: OrderService, 
    private router: Router) { }
  order: SaleOrder;
  amount: number;
  isAdmin() {
		return this.globalOrder.user.role === 'admin';
	}

	isUser() {
		return this.globalOrder.user.role === 'user';
	}
	ngOnInit() {
		if (!( this.isUser())){
			this.router.navigate(['/']);
		}

    this.order = this.globalOrder.order;
  }

  getTotalPrice() {
    return this.order.transactions.reduce((accom, transaction) => {
      return accom + transaction.amount * transaction.product.price;
    }, 0);
  }

  confirmOrder() {
    const totalPrice = this.decimalPipe.transform(this.getTotalPrice());
    if (confirm("Are you going to add the order values " + totalPrice + " THB")) {
      this.orderService.addOrder(this.order).subscribe(
        res => {
          this.globalOrder.resetOrder();
          this.router.navigate(['/products']);
          this.globalOrder.successAdd = true;
        }
      );

    } else {

    }
  }
}
