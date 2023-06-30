import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedClient: boolean = false;
  private authenticatedManager: boolean = false;
  private authenticatedDev: boolean = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this.authenticatedClient || this.authenticatedDev || this.authenticatedManager;
  }
  isAuthenticatedClient(): boolean {
    return this.authenticatedClient;
  }
  isAuthenticatedManager(): boolean {
    return this.authenticatedManager;
  }
  isAuthenticatedDev(): boolean {
    return this.authenticatedDev;
  }


  authenticateClient(): void {
    this.authenticatedClient = true;
  }
  authenticateManager(): void {
    this.authenticatedManager = true;
  }
  authenticateDev(): void {
    this.authenticatedDev = true;
  }


  deauthenticateClient(): void {
    this.authenticatedClient = false;
  }
  deauthenticateManager(): void {
    this.authenticatedManager = false;
  }
  deauthenticateDev(): void {
    this.authenticatedDev = false;
  }

}
