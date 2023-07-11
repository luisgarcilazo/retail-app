import { Component } from '@angular/core';
import { User } from 'src/app/entities/User';
import { Router } from '@angular/router';
import { AccDetailsService } from 'src/app/services/accdetails.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent {
  username!: string;
  password!: string;
  confirmPassword!: string;
  userCreated!: User;
  hide: boolean = true;

  constructor(private router: Router,
              private accDetailsService: AccDetailsService,
              public dialog: MatDialog){}


  createAccount(){
    if(this.username == null || this.password == null || this.confirmPassword == null){
      return;
    }
    this.hide= true;
    const newManager : User = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: [{'id':2,'name': "ROLE_CLIENT"}, {'id':3,'name': "ROLE_MANAGER"}] 
    }
    const dialogRef = this.dialog.open(CreateManagerDialog);
    let dialogResult: boolean = false;
    dialogRef.afterClosed().subscribe(result => {
      dialogResult = result;
      console.log(dialogResult);
      if(dialogResult == true){
        this.accDetailsService.addManager(newManager).subscribe((user: User) => {
          this.userCreated = user;
          const dialogRef2 = this.dialog.open(CreateManagerSuccessDialog);
        })
      }
    })
  
  }
}

@Component({
  selector: 'create-manager-dialog',
  templateUrl: 'create-manager-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateManagerDialog {}

@Component({
  selector: 'create-manager-success-dialog',
  templateUrl: 'create-manager-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateManagerSuccessDialog {}
