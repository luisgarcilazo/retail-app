import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../entities/Order';
import { Observable } from 'rxjs';
import { User } from '../entities/User';
import { FileProperties } from '../entities/FileProperties';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersApi = 'http://localhost:8081/orders';
  private usersApi = 'http://localhost:8081/api/users'
  private orders!: Order[];
  private allOrders!: Order[];

  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  
  constructor(private httpClient:HttpClient) {
    this.orders = [];
   }


  postOrder(username: string,order: Order): Observable<User> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.usersApi}/${username}/orders`;
    return this.httpClient.put<User>(url,order,this.httpOptions);
  }

  reloadOrdersFromUser(username: string): void {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.usersApi}/${username}/orders`;
    this.httpClient.get<Order[]>(url,this.httpOptions).subscribe((orders) => {
      this.orders = orders;
    });
  }

  reloadAllOrders(): void {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.httpClient.get<Order[]>(this.ordersApi,this.httpOptions).subscribe((orders) => {
      this.allOrders = orders;
    })

  }
  getUserOrders(): Order[] {
    return this.orders;
  }
  getAllOrders(): Order[] {
    return this.allOrders;
  }

  changeStatus(id: number, status: string){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.ordersApi}/${id}/${status}`;
    console.log(url);
    this.httpClient.put<Order>(url,this.httpOptions).subscribe();
  }

  uploadFile(formData: FormData): Observable<FileProperties> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.ordersApi}/files`;
    return this.httpClient.post<FileProperties>(url, formData);
  }
  
}
