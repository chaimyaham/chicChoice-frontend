import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQX3JkTDJybHRadldZV3dhdjVwa3RRdzZBZndCMk1obDJDNG5pM0FKeGJvIn0.eyJleHAiOjE3MTIzMjcxNTgsImlhdCI6MTcxMjMyNTM1OCwianRpIjoiYTgzMjM5MDYtMTVlYy00ZDE5LWI2ZmQtOWJlMThjMDI5NGM4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MDgwL3JlYWxtcy9jaGljLWNob2ljZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxMjIwOThlZC0xMjAxLTRkNzItOTNlMC1jZGMzZTZlYzFkMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjaGljaG9pY2UtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjVjYjZhN2JjLThkMzAtNGI2NC1iYjE1LWI2NjAxNzgxYzNhMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1jaGljLWNob2ljZSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJVU0VSIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNWNiNmE3YmMtOGQzMC00YjY0LWJiMTUtYjY2MDE3ODFjM2EwIiwiYWRkcmVzcyI6eyJyZWdpb24iOiJDYXNhYmxhbmNhIiwiY291bnRyeSI6Ik1hcm9jIn0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ2VuZGVyIjoiRkVNTUUiLCJuYW1lIjoiQ0hBSU1BQTExIE1BSFkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjaGFpbWFhbWFoeTExIiwiZ2l2ZW5fbmFtZSI6IkNIQUlNQUExMSIsImZhbWlseV9uYW1lIjoiTUFIWSIsImVtYWlsIjoidGVzdDExQGV4YW1wbGUuY29tIn0.OSMuyg_WLiTM-py9U5pQuyglMOqG-2DNiDOD61lE1caqO2FrcqVyCN3a1dYuAZgH_FxKd3Lt8KZqay47-co-JxCBy7-JMKz-iftvhZqJbdqNAShFGZigDPKliPco5A_5jm62_3a8ZEg8FdnEVZo_6dwOZ9HL7Q9z0mA4n9YNraI9tGRoe9ce5RceL_Pp4SSSEGO19ahAhJgjYCWhsUBIZ_Xv4ZMe2ygXyh7Cr8R5tQAP6bD9BVnaOkilET1WXxsrfoKKpRUXCTvdUOK6TcbHt4pTVnVDHaAj2R0Rtv6MRBUYDr-KQdmrs_f03SPviYbpUL8uK-R_STZC4wmr24Rucw";
// Séparez le token en ses parties : header, payload et signature
const parts = accessToken.split('.');
const decodedPayload = atob(parts[1]); // Décodez la partie payload en base64

// Parsez les données JSON pour obtenir les informations
const payloadData = JSON.parse(decodedPayload);

// Maintenant, vous pouvez accéder à l'e-mail et à d'autres informations
const address = payloadData.address;
console.log("Email de l'utilisateur:", address);
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
