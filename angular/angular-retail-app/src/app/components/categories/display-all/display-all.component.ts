import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entities/Product';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.css']
})
export class DisplayAllComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService,
              private cartService: CartService){}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  //help at sorting from here
  //https://stackoverflow.com/questions/7889006/sorting-arrays-numerically-by-object-property-value
  retrieveProducts(): void{
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products.sort((a,b) => (a.name > b.name ? 1 : -1));
    })
  }
  //help from here https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
  addToCart(product: Product): void{
    let cartStr = localStorage.getItem('cart');
    if(cartStr == null){
      console.log("hello");
      let cart: Product[] = [];
      cart.push(product);
      localStorage.setItem('cart',JSON.stringify(cart));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart') as string);
      cart.push(product);
      localStorage.setItem('cart',JSON.stringify(cart));
      this.cartService.calculateCart();
    }
  }

  //help from here https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  priceToCost(product: Product): string{
    return product.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
}
