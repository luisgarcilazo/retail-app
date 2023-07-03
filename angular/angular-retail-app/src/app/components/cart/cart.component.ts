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
  name!: string;
  lastname!: string;
  address!: string;
  city!: string;
  state!: string;
  zipcode!: number;

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService,
              private dialog: MatDialog){}
  
  ngOnInit(){
    this.displayCheckout = false;
    this.reloadCartItems();
  }

  reloadCartItems(): boolean{
    this.displayCheckout = false;
    this.cartService.calculateCart();
    let cartStr = localStorage.getItem('cart');
    if(cartStr == null){
      return false;
      this.costNoTax = 0;
      this.tax = 0;
      this.shipping = 0;
      this.totalCost = 0;
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
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
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


