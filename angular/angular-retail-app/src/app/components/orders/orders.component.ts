import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entities/Order';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders!: Order[]

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService,
              private orderService: OrderService,
              private dialog: MatDialog){}

  reloadOrders(): boolean {
    this.orders = this.orderService.getUserOrders();
    if(this.orders.length == 0){
      return false;
    } else {
      return true;
    }
  }

  numberToCost(num: number): string {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
}
