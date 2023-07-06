import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/User';
import { Role } from 'src/app/entities/Role';
import { AccDetailsService } from 'src/app/services/accdetails.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  user!: User;
  hide = true;
  constructor(private router: Router,
              public dialog: MatDialog,
              private accDetailsService: AccDetailsService,
              private authService: AuthService,
              private orderService:OrderService){}
  
  goToCreateAccount(){
    this.router.navigate(['/create-account']);
  }

  logIn(){
    this.authService.deauthenticateClient();
    this.authService.deauthenticateManager();
    this.authService.deauthenticateDev();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authKey');
    this.hide = false;
    let rawuser = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: []
    };
    localStorage.setItem('currentUser', rawuser.username);
    this.accDetailsService.loginCheck(rawuser).subscribe((user) => {
      this.user = user;
      let isDev:boolean = false;
      let isManager: boolean = false;
      if(this.user.enabled == false) {
        const dialogRefFail = this.dialog.open(LoginFailDialog);
        this.username = '';
        this.password = '';
        return;
      } else {
        localStorage.setItem('authKey', 'Basic ' + btoa(`${rawuser.username}:${rawuser.password}`));
        this.user.roles.forEach((role: Role) => {
          if(role.name === 'ROLE_DEVELOPER'){
            isDev = true;
          }
          if(role.name === 'ROLE_MANAGER'){
            isManager = true;
          } 
        })
        if(isDev){
          this.authService.authenticateClient();
          this.authService.authenticateManager();
          this.authService.authenticateDev();
          this.orderService.reloadOrdersFromUser(rawuser.username);
          this.orderService.reloadAllOrders();
        } else if (isManager) {
          this.authService.authenticateClient();
          this.authService.authenticateManager();
          this.orderService.reloadOrdersFromUser(rawuser.username);
          this.orderService.reloadAllOrders();
        } else {
          this.authService.authenticateClient();
          this.orderService.reloadOrdersFromUser(rawuser.username);
        }
        const dialogRefFail = this.dialog.open(LoginSuccessDialog);
        this.router.navigate(['store']);
        this.username = '';
        this.password = '';
      }
    })
  }
}


@Component({
  selector: 'login-fail-dialog',
  templateUrl: 'login-fail-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LoginFailDialog {}

@Component({
  selector: 'login-success-dialog',
  templateUrl: 'login-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LoginSuccessDialog {}