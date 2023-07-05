import { Injectable } from '@angular/core';
import { Product } from '../entities/Product';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  costNoTax!: number;
  tax!: number;
  shipping!: number;
  totalCost!: number;

  constructor() { }

  clearCart(): void {
    localStorage.removeItem('cart');
  }

  calculateCart(): void {
    let cartStr = localStorage.getItem('cart');
    if(cartStr == null){
      this.costNoTax = 0;
      this.tax = 0;
      this.shipping = 0;
      this.totalCost = 0;
      return;
    } else {
      this.costNoTax = 0;
      this.tax = 0;
      this.shipping = 0;
      this.totalCost = 0;
      let cart: Product[] = JSON.parse(cartStr as string);
      cart.forEach((product) => this.costNoTax += product.price);
      this.tax = this.costNoTax * 0.0825;
      this.shipping = 4.99
      this.totalCost = this.costNoTax + this.tax + this.shipping;
      return;
    }
  }
  getCostWithoutTax(): number{
    return this.costNoTax;
  }
  getTax(): number{
    return this.tax;
  }
  getShippingCost(): number {
    return this.shipping;
  }
  getTotalCost(): number {
    return this.totalCost;
  }
}
