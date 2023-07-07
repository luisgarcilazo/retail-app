import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entities/Product';
import { CartService } from 'src/app/services/cart.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  products!: Product[];
  amount!: string;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private dialog: MatDialog){}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  //help at sorting from here
  //https://stackoverflow.com/questions/7889006/sorting-arrays-numerically-by-object-property-value
  retrieveProducts(): void{
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products.filter((a) => a.category == "Health").sort((a,b) => (a.name > b.name ? 1 : -1));
    })
  }
  
  //help from here https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
  addToCart(product: Product): void{

    const dialogRef = this.dialog.open(HealthAddToCartDialog, {
      data: {name: product.name, amount: this.amount},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this.amount = result;
        if(parseInt(result) > product.stock){
          const dialogRef2 = this.dialog.open(NotEnoughStockDialog);
          return;
        }
        let cartStr = localStorage.getItem('cart');
        product.amount = this.amount;
        if(cartStr == null){
          console.log("hello");
          let cart: Product[] = [];
          cart.push(product);
          localStorage.setItem('cart',JSON.stringify(cart));
        } else {
          let cart: Product[] = JSON.parse(localStorage.getItem('cart') as string);
          let exists: boolean = false;
          let hasEnoughStock: boolean = true;
          cart.forEach((p) => {
            if(p.id == product.id){
              let amount = "" + (parseInt(p.amount as string) + parseInt(product.amount as string));
              if(p.stock >= parseInt(amount)){
                hasEnoughStock = true;
                p.amount = amount;
              } else {
                hasEnoughStock = false;
              }
              exists = true;
            }
          })
          if(exists == false){
            cart.push(product);
          } 
          localStorage.setItem('cart',JSON.stringify(cart));
          this.cartService.calculateCart();
          if(hasEnoughStock == true){
            const dialogRef2 = this.dialog.open(HealthSuccessAddCartDialog);
          } else {
            const dialogRef2 = this.dialog.open(NotEnoughStockDialog);
          }
          
        }
      }  else {
        console.log("undefined");
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
}

@Component({
  selector: 'health-add-to-cart-dialog',
  templateUrl: 'health-add-to-cart-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
})
export class HealthAddToCartDialog {
  constructor(
    public dialogRef: MatDialogRef<HealthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.data.amount = 0;
    this.dialogRef.close();
  }
}

@Component({
  selector: 'health-success-add-cart-dialog',
  templateUrl: 'health-success-add-cart-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class HealthSuccessAddCartDialog {}

@Component({
  selector: 'health-not-enough-stock-dialog.',
  templateUrl: 'not-enough-stock-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NotEnoughStockDialog {}