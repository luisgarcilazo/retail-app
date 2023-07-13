import { Component } from '@angular/core';
import { Order } from 'src/app/entities/Order';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileSaverService } from 'ngx-filesaver';

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
    private dialog: MatDialog,
    private fileService: FileSaverService){}

    amountPlaced: number = 0;
    amountPending: number = 0;
    amountCompleted: number = 0;
    amountCancelled: number = 0;
    totalOrders: number = 0;
    
  reloadOrders(): boolean {
    this.amountPlaced = 0;
    this.amountPending = 0;
    this.amountCompleted = 0;
    this.amountCancelled = 0;
    this.totalOrders = 0;
    this.orders = this.orderService.getAllOrders();
    this.orders.forEach((order: Order) => {
      if(order.status == 'Placed'){
        this.amountPlaced++;
      } else if (order.status == 'Completed'){
        this.amountCompleted++;
      } else if (order.status == 'Pending') {
        this.amountPending++;
      } else if (order.status == 'Cancelled'){
        this.amountCancelled++;
      }
    })
    this.totalOrders = this.amountCancelled + this.amountPending + this.amountCompleted + this.amountPlaced;
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
    const dialogRef = this.dialog.open(ConfirmChangeStatus)
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
    const dialogRef = this.dialog.open(ConfirmChangeStatus)
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
    const dialogRef = this.dialog.open(ConfirmChangeStatus)
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
    const dialogRef = this.dialog.open(ConfirmChangeStatus)
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.changeStatus(order.id as number,"Cancelled");
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
  parseInt(str: string) {
    return parseInt(str);
  }
  containsFile(order: Order): boolean {
    if(order.filename == '' || order.filename == null || order.filename == 'No gift was added'){
      return false
    } else {
      return true;
    }
  }
  //help from here https://stackoverflow.com/questions/53246489/how-to-use-filesaver-in-angular-5-correctly
  downloadFile(order: Order){
      const dialogRef = this.dialog.open(DownloadConfirmDialog);
      dialogRef.afterClosed().subscribe((result) => {
        if(result == true){
          this.orderService.getFile(order.username, order.filename).subscribe((response) => {
            try{
              this.fileService.save(response,order.filename)
            } catch(e){
              console.log(e);
            }
          });
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
export class ConfirmChangeStatus {}

@Component({
  selector: 'success-dialog',
  templateUrl: 'success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessDialog {}

@Component({
  selector: 'download-confirm-dialog',
  templateUrl: 'download-confirm-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DownloadConfirmDialog {}