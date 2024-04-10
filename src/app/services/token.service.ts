import { Injectable } from '@angular/core';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
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
}