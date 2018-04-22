import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TopBannerComponent } from './banner/top-banner/top-banner.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/list/list.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { ProductService } from './service/product.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalOrderService } from './service/global-order.service';
import { DecimalPipe } from '@angular/common';
import { OrderService } from './service/order.service';
import { AuthenticateService } from './service/authenticate.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBannerComponent,
    LoginComponent,
    ProductListComponent,
    CartListComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    GlobalOrderService,
    DecimalPipe,
    OrderService,
    AuthenticateService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {constructor(apollo: Apollo, httpLink: HttpLink, private http:HttpClient) {
  const cache = new InMemoryCache();
  let graphqlUri:string;
  this.http.get('./assets/setting.json').subscribe( (res) =>{
    graphqlUri = (res as any).graphql;
    apollo.create({
      link: httpLink.create({ uri: graphqlUri }),
      cache: new InMemoryCache()
    });
  })
 
} }
