import { Component } from '@angular/core';
import { Order } from 'src/app/entities/Order';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
  orders !: Order[];

  constructor(private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private dialog: MatDialog){}

  reloadOrders(): boolean {
    this.orders = this.orderService.getAllOrders();
    if(this.orders.length == 0){
      return false;
    } else {
      return true;
    }
  }

  reloadOrdersButton(): void {
    this.orderService.reloadAllOrders();
    this.reloadOrders();
  }

  numberToCost(num: number): string {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  setAsCompleted(order: Order){
    const dialogRef = this.dialog.open(ConfirmLogoutDialog)
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.changeStatus(order.id as number,"Completed");
        const dialogRef2 = this.dialog.open(SuccessDialog);
        dialogRef2.afterClosed().subscribe((result) => {
          this.orderService.reloadAllOrders();
          this.reloadOrders();
        })
      } else {
        return
      }
    })
  }

  setAsPending(order: Order){
    const dialogRef = this.dialog.open(ConfirmLogoutDialog)
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.changeStatus(order.id as number,"Pending");
        const dialogRef2 = this.dialog.open(SuccessDialog);
        dialogRef2.afterClosed().subscribe((result) => {
          this.orderService.reloadAllOrders();
          this.reloadOrders();
        })
      } else {
        return
      }
    })
  }

  setAsPlaced(order: Order){
    const dialogRef = this.dialog.open(ConfirmLogoutDialog)
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.changeStatus(order.id as number,"Placed");
        const dialogRef2 = this.dialog.open(SuccessDialog);
        dialogRef2.afterClosed().subscribe((result) => {
          this.orderService.reloadAllOrders();
          this.reloadOrders();
        })
      } else {
        return
      }
    })
  }

  
  cancelOrder(order: Order){
    const dialogRef = this.dialog.open(ConfirmLogoutDialog)
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.changeStatus(order.id as number,"cancelled");
        const dialogRef2 = this.dialog.open(SuccessDialog);
        dialogRef2.afterClosed().subscribe((result) => {
          this.orderService.reloadAllOrders();
          this.reloadOrders();
        })
      } else {
        return
      }
    })
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmLogoutDialog {}

@Component({
  selector: 'success-dialog',
  templateUrl: 'success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessDialog {}