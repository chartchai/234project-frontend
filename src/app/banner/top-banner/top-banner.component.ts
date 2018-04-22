import { Component, OnInit } from '@angular/core';
import { GlobalOrderService } from '../../service/global-order.service';
import { Router } from '@angular/router';
import { User } from '../../entity/product';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.css']
})
export class TopBannerComponent implements OnInit {

  constructor(private order:GlobalOrderService, private router:Router) { }

  ngOnInit() {

    
  }

  isAdmin(){
    return this.order.user.role === 'admin';
  }

  isUser(){
    return this.order.user.role === 'user';
  }

  isAuthen(){
    return this.isAdmin() || this.isUser();
  }

  logout(){
    this.order.resetAll();
    this.router.navigate(['/']);
    
  }
}
