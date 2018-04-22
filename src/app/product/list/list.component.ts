import { Component, OnInit } from '@angular/core';
import { Product, SaleOrder, SaleTransaction } from '../../entity/product';
import { ProductService } from '../../service/product.service';
import { GlobalOrderService } from '../../service/global-order.service';
import { Router, NavigationEnd, Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';

@Component({
	selector: 'app-product-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {

	products: [Product];
	showSuccess;
	constructor(private productService: ProductService
		, private globalOrderService: GlobalOrderService
		, private router: Router
		, private activatedRoute: ActivatedRoute) {

	}

	checkUpdate(source, target): boolean {
		if (source === '/cart' && target === '/products') {
			return true;
		} else {
			return false;
		}

	}

	checkSuccess() {
		this.showSuccess = {};
		this.showSuccess.value = this.globalOrderService.successAdd;
		this.globalOrderService.successAdd = false;
	}

	isAdmin() {
		return this.globalOrderService.user.role === 'admin';
	}

	isUser() {
		return this.globalOrderService.user.role === 'user';
	}
	ngOnInit() {
		if (!(this.isAdmin() || this.isUser())){
			this.router.navigate(['/']);
		}
			this.checkSuccess();
		this.productService.getProducts()
			.subscribe(
				(res) => {
					this.products = res.data.products;
				}
			);
	}





	addProduct(product: Product) {
		this.showSuccess.value = this.globalOrderService.successAdd;
		if (!this.isSelectedProduct(product))
			this.globalOrderService.order.transactions.push({ product: product, amount: 1 } as SaleTransaction);
	}

	isSelectedProduct(product: Product) {
		return this.globalOrderService.order.transactions.filter(transaction => transaction.product === product).length != 0;
	}

}
