import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accessToken!: string;
  firstName!:string;
  lastName!:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token')||'';
    const parts = this.accessToken.split('.');
    const decodedPayload = atob(parts[1]); 
    const payloadData = JSON.parse(decodedPayload);
    const address = payloadData.address;
    this.firstName=payloadData.given_name;
    this.lastName=payloadData.family_name;

   
  }
  toggleActive(index: number) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, i) => {
      if (i + 1 === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
