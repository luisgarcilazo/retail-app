import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent {

  constructor(private router: Router,
              private dialog: MatDialog,
              private authService: AuthService){}

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  isManager(): boolean {
    return this.authService.isAuthenticatedManager();
  }

  isClient(): boolean {
    return this.authService.isAuthenticatedClient();
  }
  logout(){
    const dialogRef1 = this.dialog.open(ConfirmLogoutDialog);
    let dialogResult: boolean = false;
    dialogRef1.afterClosed().subscribe(result => {
      dialogResult = result;
      if(dialogResult == true){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authKey');
        this.authService.deauthenticateClient();
        this.authService.deauthenticateManager();
        this.authService.deauthenticateDev();
        const dialogRef2 = this.dialog.open(LogoutSuccessDialog);
        this.router.navigate(['']);
      }
    })
  }
}

@Component({
  selector: 'logout-success-dialog',
  templateUrl: 'logout-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LogoutSuccessDialog {}

@Component({
  selector: 'confirm-logout-dialog',
  templateUrl: 'confirm-logout-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmLogoutDialog {}
