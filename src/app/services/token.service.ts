import { Injectable } from '@angular/core';
import { Address } from '../models/Address';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenCheckInterval!: Subscription;
  constructor(private router: Router) { }
  getDecodedToken(): any {
    const accessToken = localStorage.getItem('access_token') || '';
    const parts = accessToken.split('.');
    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  }

  getUserID(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.utilisateurid || '';
  }

  getFirstName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.given_name || '';
  }

  getLastName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.family_name || '';
  }

  getAddress(): Address {
    const decodedToken = this.getDecodedToken();
    return decodedToken.address || '';
  }

  getPreferredStyle(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.style || '';
  }
  getEmail(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.email || '';
  }
  getGender(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.gender || '';
  }
  startTokenCheck(): void {
    const checkIntervalMinutes = 1;
    this.tokenCheckInterval = interval(checkIntervalMinutes * 60 * 1000).subscribe(() => {
      const new_expires_in = parseInt(localStorage.getItem('expires_in')||'') - (1*60*1000);
      localStorage.setItem('expires_in',new_expires_in.toString())
      this.redirectToLoginIfExpired();
    });
  }

  stopTokenCheck(): void {
    if (this.tokenCheckInterval) {
      this.tokenCheckInterval.unsubscribe();
    }
  }

  isTokenExpired(): boolean {
    const expires_in = localStorage.getItem('expires_in') || ''; 
    if(parseInt(expires_in)<=0) return true;
    else return false;
  }

  redirectToLoginIfExpired(): void {
    if (this.isTokenExpired()) {
      console.log("by");
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token'); 
      localStorage.removeItem('expires_in'); 
      this.router.navigate(['/login']);
    }
  }
}