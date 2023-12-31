import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/User';
import { AccDetailsService } from 'src/app/services/accdetails.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  username!: string;
  password!: string;
  confirmPassword!: string;
  userCreated!: User;
  hide: boolean = true;

  constructor(private router: Router,
              private accDetailsService: AccDetailsService,
              public dialog: MatDialog){}

  goToLogin(){
    this.router.navigate(['/login']);
  }

  createAccount(){
    if(this.username == null || this.password == null || this.confirmPassword == null){
      return;
    }
    this.hide= true;
    const newClient : User = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: [{'id':2,'name': "ROLE_CLIENT"}] 
    }
    const dialogRef = this.dialog.open(CreateAccDialog);
    let dialogResult: boolean = false;
    dialogRef.afterClosed().subscribe(result => {
      dialogResult = result;
      console.log(dialogResult);
      if(dialogResult == true){
        this.accDetailsService.addClient(newClient).subscribe((user: User) => {
          this.userCreated = user;
          const dialogRef2 = this.dialog.open(CreateSuccessDialog);
          dialogRef2.afterClosed().subscribe((result) => {
            this.router.navigate(['/login']);
          })
        })
      }
    })
    
  }
}

@Component({
  selector: 'create-acc-dialog',
  templateUrl: 'create-acc-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateAccDialog {}

@Component({
  selector: 'create-success-dialog',
  templateUrl: 'create-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateSuccessDialog {}