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
import { CommonModule, NgFor } from '@angular/common';

export interface DialogData {
  stockOptionLimit: number[];
  amount: string;
}


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  products!: Product[];
  amount!: string;
  stockOptionLimit: number[] = [1,2,3,4,5,6,7,8,9,10,
                                21,22,23,24,25,26,27,28,29,30,
                                31,32,33,34,35,36,37,38,39,40,
                                41,42,43,44,45,46,47,48,49,50,
                                51,52,53,54,55,56,57,58,59,60,
                                61,62,63,64,65,66,67,68,69,70,
                                71,72,73,74,75,76,77,78,79,80,
                                81,82,83,84,85,86,87,88,89,90,
                                91,92,93,94,95,96,97,98,99,100
                              ];

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
      this.products = products.sort((a,b) => ((a.id as number) > (b.id as number) ? 1 : -1));
    })
  }

  //help from here https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  priceToCost(product: Product): string{
    return product.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  addStock(product: Product): void {
    const dialogRef = this.dialog.open(AddStockDialog, {
      data: {stockOptionLimit:this.stockOptionLimit, amount: this.amount},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.amount);
      console.log(result);
      this.amount = result;

      if(result != undefined){
        this.productService.increaseStock(product.id as number, parseInt(this.amount)).subscribe(() => {
          this.retrieveProducts(); 
          const dialogRef2 = this.dialog.open(SuccessModifyStock);
          dialogRef2.afterClosed().subscribe(() => {
            return;
          })
        });
      } else {
        return;
      }
    })
  }

  removeStock(product: Product): void {
    let removeStockOptionLimit: number[] = [];
    for(let i = 1; i <= product.stock; i++){
      removeStockOptionLimit.push(i);
    }
    const dialogRef = this.dialog.open(RemoveStockDialog, {
      data: {stockOptionLimit: removeStockOptionLimit, amount: this.amount},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.amount);
      console.log(result);
      this.amount = result;

      if(result != undefined){
        this.productService.decreaseStock(product.id as number, parseInt(this.amount)).subscribe(() => {
          this.retrieveProducts(); 
          const dialogRef2 = this.dialog.open(SuccessModifyStock);
          dialogRef2.afterClosed().subscribe(() => {
            return;
          })
        });
      } else {
        return;
      }
    })
  }
}

@Component({
  selector: 'add-stock-dialog',
  templateUrl: 'add-stock-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, CommonModule, NgFor],
})
export class AddStockDialog {
  constructor(
    public dialogRef: MatDialogRef<ManageProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.data.amount = "0";
    this.dialogRef.close();
  }
}

@Component({
  selector: 'remove-stock-dialog',
  templateUrl: 'remove-stock-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, CommonModule, NgFor],
})
export class RemoveStockDialog {
  constructor(
    public dialogRef: MatDialogRef<ManageProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.data.amount = "0";
    this.dialogRef.close();
  }
}

@Component({
  selector: 'success-modify-stock-dialog',
  templateUrl: 'success-modify-stock-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessModifyStock {}
