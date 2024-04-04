import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

}
