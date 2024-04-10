import { Component } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chicChoice-frontend';
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.startTokenCheck();
  }

  ngOnDestroy(): void {
    this.tokenService.stopTokenCheck();
  }
}
