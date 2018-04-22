import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
import { GlobalOrderService } from '../service/global-order.service';
import { User } from '../entity/product';
import { OrderListComponent } from '../order/order-list/order-list.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(private authenService: AuthenticateService,
            private router: Router,
            private globalOrder:GlobalOrderService) { }

  ngOnInit() {
    this.userNameError = false;
    this.globalOrder.resetOrder();
  }
  userNameError:boolean;

  login() {
    this.loading = true;
    this.authenService.getUser(this.model.username,this.model.password)
      .subscribe(
        res=> {
            let user:User = res.data.user;
            if (user != null){
              this.globalOrder.user = user;
              this.router.navigate(['/products']);
              this.userNameError = false;
            }else{
              this.userNameError = true;
              this.loading = false;
            }
        }
      )
    // this.authenticationService.login(this.model.username, this.model.password)
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
}

}
