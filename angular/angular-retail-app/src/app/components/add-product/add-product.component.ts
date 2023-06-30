import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import { Product } from 'src/app/entities/Product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  name!: string;
  category!: string;
  price!: number;
  stock!: number;
  product!: Product;

  constructor(private dialog: MatDialog,
              private productService: ProductService){};

  addProduct(): void {
    if(this.name == null || this.category == null || this.price == null || this.stock == null){
      return;
    }
    if(this.price <= 0 || this.stock <= 0 || this.price >= 20000){
      alert("price or stock can't be negative or less than or equal to zero");
      return;
    }
    const newProduct : Product = {
      name: this.name,
      category: this.category,
      price: this.price,
      stock: this.stock
    };

    const dialogRef = this.dialog.open(ConfirmProductDialog);
    let dialogResult: boolean = false;
    dialogRef.afterClosed().subscribe(result => {
      dialogResult = result;
      if(dialogResult == true){
        this.productService.addProduct(newProduct).subscribe((product) => {
          this.product = product;
          const dialogRef2 = this.dialog.open(SuccessProductDialog);
          return;
        })
      }
    })
  }
}

@Component({
  selector: 'confirm-product-dialog',
  templateUrl: 'confirm-product.dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmProductDialog {}

@Component({
  selector: 'sucess-product-dialog',
  templateUrl: 'success-product-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessProductDialog {}
