import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  hide = true;
  constructor(private router: Router){}

  goToCreateAccount(){
    this.router.navigate(['/create-account']);
  }

  logIn(){
    console.log(this.password);
  }
}
