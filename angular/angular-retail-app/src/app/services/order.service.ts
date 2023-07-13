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
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.usersApi}/${username}/orders`;
    return this.httpClient.put<User>(url,order,this.httpOptions);
  }

  reloadOrdersFromUser(username: string): void {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.usersApi}/${username}/orders`;
    this.httpClient.get<Order[]>(url,this.httpOptions).subscribe((orders) => {
      this.orders = orders;
    });
  }

  reloadAllOrders(): void {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
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
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.ordersApi}/${id}/${status}`;
    console.log(url);
    this.httpClient.put<Order>(url,this.httpOptions).subscribe();
  }

  //help from https://stackoverflow.com/questions/42013087/multipartexception-current-request-is-not-a-multipart-request
  // and https://stackoverflow.com/questions/36005436/the-request-was-rejected-because-no-multipart-boundary-was-found-in-springboot
  uploadFile(formData: FormData): Observable<FileProperties> {
    this.httpOptions.headers = new HttpHeaders({
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.ordersApi}/files`;
    return this.httpClient.post<FileProperties>(url, formData,this.httpOptions);
  }

  //help from here https://stackoverflow.com/questions/35138424/how-do-i-download-a-file-with-angular2-or-greater, https://stackoverflow.com/questions/50798592/angular-6-how-to-set-response-type-as-text-while-making-http-call
  //and
  //https://nils-mehlhorn.de/posts/angular-file-download-progress/
  getFile(username: string, filename: string): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.ordersApi}/files/${username}/${filename}`;
    return this.httpClient.get(url,{ headers , responseType: 'blob'});
  }
  
}
