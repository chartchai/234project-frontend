import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/list/list.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
const appRoutes: Routes = [
    {
      path: '',
      component: LoginComponent,
      pathMatch: 'full'
    },
    {
      path: 'products',
      component: ProductListComponent,
    },
    {
      path: 'cart',
      component: CartListComponent,
    },
    {
      path: 'total',
      component: OrderListComponent,
    },
    {
      path: '**',
      component: LoginComponent
    }
  ];

    @NgModule({
      imports: [RouterModule.forRoot(appRoutes)],
      exports: [RouterModule],
      providers: []
    })
    export class AppRoutingModule { }
