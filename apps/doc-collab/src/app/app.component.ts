import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'doccollab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  private verifyLoggedIn() {
    console.log('in logged in');
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }

  ngOnInit() {
    this.verifyLoggedIn();
  }

}
