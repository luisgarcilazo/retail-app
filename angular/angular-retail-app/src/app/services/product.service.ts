import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../entities/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsApi = 'http://localhost:8081/store/products'
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http:HttpClient) { }

  addProduct(product: Product): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<Product>(this.productsApi,product,this.httpOptions);
  }
  
  getAllProducts(): Observable<Product[]>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<Product[]>(this.productsApi,this.httpOptions);
  }

  decreaseStock(id: number, amount: number): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.productsApi}/${id}/stock/decrease/${amount}`;
    return this.http.put<Product>(url,this.httpOptions);
  }

  increaseStock(id: number, amount: number): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.productsApi}/${id}/stock/increase/${amount}`;
    return this.http.put<Product>(url,this.httpOptions);
  }

  changeName(id: number, name: string): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.productsApi}/${id}/name/${name}`;
    return this.http.put<Product>(url,this.httpOptions);
  }

  changeCategory(id: number, category: string): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.productsApi}/${id}/category/${category}`;
    return this.http.put<Product>(url,this.httpOptions);
  }

  changePrice(id: number, price: number): Observable<Product>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.productsApi}/${id}/price/${price}`;
    return this.http.put<Product>(url,this.httpOptions);
  }
}
