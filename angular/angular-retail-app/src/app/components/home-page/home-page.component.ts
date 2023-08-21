import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router,
    private authService: AuthService){}


    isLoggedIn(): boolean {
      return this.authService.isAuthenticated();
    }

    goToCreateAccount(): void {
      this.router.navigate(['/create-account']);
    }
    goToStore(): void {
      this.router.navigate(['/store']);
    }
    goToCart(): void {
      this.router.navigate(['/cart']);
    }
}
