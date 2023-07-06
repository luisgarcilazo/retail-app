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
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {
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
      this.products = products.filter((a) => a.category == "Vegetables").sort((a,b) => (a.name > b.name ? 1 : -1));
    })
  }
  
  //help from here https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
  addToCart(product: Product): void{

    const dialogRef = this.dialog.open(VegetablesAddToCartDialog, {
      data: {name: product.name, amount: this.amount},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this.amount = result;
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
          cart.forEach((p) => {
            if(p.id == product.id){
              p.amount = "" + (parseInt(p.amount as string) + parseInt(product.amount as string));
              exists = true;
            }
          })
          if(exists == false){
            cart.push(product);
          } 
          localStorage.setItem('cart',JSON.stringify(cart));
          this.cartService.calculateCart();
          const dialogRef2 = this.dialog.open(VegetablesSuccessAddCartDialog);
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
  selector: 'vegetables-add-to-cart-dialog',
  templateUrl: 'vegetables-add-to-cart-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
})
export class VegetablesAddToCartDialog {
  constructor(
    public dialogRef: MatDialogRef<VegetablesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.data.amount = 0;
    this.dialogRef.close();
  }
}

@Component({
  selector: 'vegetables-success-add-cart-dialog',
  templateUrl: 'vegetables-success-add-cart-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class VegetablesSuccessAddCartDialog {}