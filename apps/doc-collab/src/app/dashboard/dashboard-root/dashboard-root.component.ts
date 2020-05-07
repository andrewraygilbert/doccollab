import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'doccollab-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('login');
      })
      .catch(err => console.log(err));
  }

  ngOnInit(): void {
  }

}
