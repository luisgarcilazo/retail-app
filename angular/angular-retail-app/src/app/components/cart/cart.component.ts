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
import { PROMOCODES } from './PromoCodes';
import { PromoCode } from './PromoCode';
import { ProductService } from 'src/app/services/product.service';
import { HttpResponse } from '@angular/common/http';
import { FileProperties } from 'src/app/entities/FileProperties';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  promoIncluded: boolean = false;
  promoDiscount: number = 0;
  promoAmount: number = 0;
  totalWithPromo: number = 0;

  displayCheckout!: boolean;
  promoCodes: PromoCode[] = PROMOCODES;
  firstname!: string;
  lastname!: string;
  address!: string;
  city!: string;
  state!: string;
  zipcode!: number;

  addGift: boolean = false;
  fileName: string = '';
  file!: File;

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService,
              private orderService: OrderService,
              private productService: ProductService,
              private dialog: MatDialog){}
  
  ngOnInit(){
    this.displayCheckout = false;
    this.reloadCartItems();
  }

  reloadCartItems(): boolean{
    if(!this.authService.isAuthenticated()){
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
          this.displayCheckout = false;
        } else {
          localStorage.setItem('cart',JSON.stringify(this.cartItems));
        }
        this.reloadCartItems();
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

  getTotalItemCost(product: Product) : number {
    return (product.price * parseInt(product.amount as string));
  }

  applyDiscount() {
    this.promoCodes.forEach((promo) => {
      if(this.promoCode == promo.code){
        this.promoIncluded = true;
        this.promoDiscount = promo.amount;
        this.promoAmount = Math.round((this.costNoTax * (promo.amount / 100)) * 100) / 100;
        this.totalWithPromo = this.totalCost - this.promoAmount;
      }
    });
  }

  checkout(){
    if(!this.authService.isAuthenticated()){
      const dialogRef1 = this.dialog.open(NonAuthDialog);
      dialogRef1.afterClosed().subscribe((result) => {
        this.router.navigate(['/login']);
      })
    } else {
      if(this.totalCost <= 0){
        this.displayCheckout = false;
        const dialogRef = this.dialog.open(NoItemsDialog);
        return;
      }
      this.displayCheckout = true;
    }
  }

  canCheckout(): boolean {
    return this.displayCheckout;
  }


  async submitOrder(){
    if(this.firstname == null || this.lastname == null || this.address == null || this.city == null || this.state == null || this.zipcode == null){
      console.log("hello");
      return;
    }
    if(this.addGift == true && (this.fileName == null || this.file == null)){
      return;
    }
    const username: string = localStorage.getItem('currentUser') as string;
    const products: ProductOrder[] = [];
    this.cartItems.forEach((product: Product) => {
      let productToAdd: ProductOrder = {
        product: product,
        amount: product.amount as string
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
      status: "Placed",
      totalcost: this.promoIncluded ? this.totalWithPromo : this.totalCost,
      filename: (this.addGift) ? this.fileName : "No gift was added",
      username: localStorage.getItem('currentUser') as string,
      productOrders: products
    }
    const dialogRef1 = this.dialog.open(OrderPlaceDialog)
    dialogRef1.afterClosed().subscribe((result) => {
      if(result == true){
        if(this.addGift == true){
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('user',localStorage.getItem('currentUser') as string);
          this.orderService.uploadFile(formData).subscribe((response: FileProperties) => {
            orderToSubmit.filename = response.fileName;
            console.log(response.path)
            this.orderService.postOrder(username,orderToSubmit).subscribe((user) => {
              const dialogRef2 = this.dialog.open(OrderSuccessDialog);
              orderToSubmit.productOrders.forEach((productOrder) => {
                this.productService.decreaseStock(productOrder.product.id as number, parseInt(productOrder.amount)).subscribe();
              });
              
              dialogRef2.afterClosed().subscribe(() => {
                this.cartService.clearCart();
                this.reloadCartItems();
                this.displayCheckout = false;
                let username = localStorage.getItem("currentUser") as string;
                this.orderService.reloadOrdersFromUser(username);
                if(this.authService.isAuthenticatedManager()){
                  this.orderService.reloadAllOrders();
                }
                this.router.navigate(['/orders'])
              })
    
            })
          });
        } else {
          this.orderService.postOrder(username,orderToSubmit).subscribe((user) => {
            const dialogRef2 = this.dialog.open(OrderSuccessDialog);
            orderToSubmit.productOrders.forEach((productOrder) => {
              this.productService.decreaseStock(productOrder.product.id as number, parseInt(productOrder.amount)).subscribe();
            });
            
            dialogRef2.afterClosed().subscribe(() => {
              this.cartService.clearCart();
              this.reloadCartItems();
              this.displayCheckout = false;
              let username = localStorage.getItem("currentUser") as string;
              this.orderService.reloadOrdersFromUser(username);
              this.orderService.reloadAllOrders();
              this.router.navigate(['/orders'])
            })

          })
        }

      } else {
        return;
      }
    })
  }

  //help from https://blog.angular-university.io/angular-file-upload/
  onFileSelected(event: any) {
     this.file = event.target.files[0];
     if(this.file){
      this.fileName = this.file.name;
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

@Component({
  selector: 'no-items-dialog',
  templateUrl: 'no-items-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NoItemsDialog {}


