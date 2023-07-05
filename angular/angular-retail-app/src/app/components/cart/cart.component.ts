import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/Product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Order } from 'src/app/entities/Order';
import { ProductOrder } from 'src/app/entities/ProductOrder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!: Product[];
  costNoTax!: number;
  tax!: number;
  shipping!: number;
  totalCost!: number;
  promoCode!: string;

  displayCheckout!: boolean;

  firstname!: string;
  lastname!: string;
  address!: string;
  city!: string;
  state!: string;
  zipcode!: number;

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService,
              private orderService: OrderService,
              private dialog: MatDialog){}
  
  ngOnInit(){
    this.displayCheckout = false;
    this.reloadCartItems();
  }

  reloadCartItems(): boolean{
    if(this.authService.isAuthenticated()){
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth');
    }
    this.cartService.calculateCart();
    let cartStr = localStorage.getItem('cart');
    if(cartStr == null){
      this.costNoTax = 0;
      this.tax = 0;
      this.shipping = 0;
      this.totalCost = 0;
      return false;
    } else {
      this.cartItems= JSON.parse(localStorage.getItem('cart') as string);
      this.costNoTax = this.cartService.getCostWithoutTax();
      this.tax = this.cartService.getTax();
      this.shipping = this.cartService.getShippingCost();
      this.totalCost = this.cartService.getTotalCost();
      return true;
    }
  }

  //some help from here to remove from array https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
  deleteItemFromCart(item: Product){
    this.cartItems= JSON.parse(localStorage.getItem('cart') as string);
    const dialogRef1 = this.dialog.open(DeleteItemDialog);
    dialogRef1.afterClosed().subscribe((result) => {
      if(result == true){
        let index: number = -1;
        let i: number = 0;
        this.cartItems.forEach((p) => {
          if(p.id == item.id){
            index = i; 
            i++;
          } else {
            i++;
          }
        })
        this.cartItems.splice(index, 1);
        if(this.cartItems.length == 0){
          localStorage.removeItem('cart');
        } else {
          localStorage.setItem('cart',JSON.stringify(this.cartItems));
        }
      }
    })
    
    
  }
  //help from here https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  priceToCost(product: Product): string{
    return product.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  numberToCost(num: number): string {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  checkout(){
    if(!this.authService.isAuthenticated()){
      const dialogRef1 = this.dialog.open(NonAuthDialog);
      dialogRef1.afterClosed().subscribe((result) => {
        this.router.navigate(['/login']);
      })
    } else {
      this.displayCheckout = true;
    }
  }

  canCheckout() {
    return this.displayCheckout;
  }

  submitOrder(){
    if(this.firstname == null || this.lastname == null || this.address == null || this.city == null || this.state == null || this.zipcode == null){
      console.log("hello");
      return;
    }
    const username: string = localStorage.getItem('currentUser') as string;
    const products: ProductOrder[] = [];
    this.cartItems.forEach((product: Product) => {
      let productToAdd: ProductOrder = {
        product_id: product.id as number,
        amount: 1
      };
      products.push(productToAdd);
    })
    let orderToSubmit: Order = {
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      status: "placed",
      totalcost: this.totalCost,
      filename: "empty",
      productOrders: products
    }
    const dialogRef1 = this.dialog.open(OrderPlaceDialog)
    dialogRef1.afterClosed().subscribe((result) => {
      if(result == true){
        this.orderService.postOrder(username,orderToSubmit).subscribe((user) => {
          console.log(user);
          const dialogRef2 = this.dialog.open(OrderSuccessDialog);
          this.cartService.clearCart();
          this.reloadCartItems();
          let username = localStorage.getItem("currentUser") as string;
          this.orderService.reloadOrdersFromUser(username);
        })
      } else {
        return;
      }
    })
  }
}

@Component({
  selector: 'delete-item-dialog',
  templateUrl: 'delete-item-dialog.html',
  styleUrls: ['cart.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteItemDialog {}

@Component({
  selector: 'non-auth-dialog',
  templateUrl: 'non-auth-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NonAuthDialog {}


@Component({
  selector: 'order-place-dialog',
  templateUrl: 'order-place-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class OrderPlaceDialog {}

@Component({
  selector: 'order-success-dialog',
  templateUrl: 'order-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class OrderSuccessDialog {}


