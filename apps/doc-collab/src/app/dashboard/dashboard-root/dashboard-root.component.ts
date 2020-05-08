import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { CoreSocketService } from './../../socket/core-socket.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'doccollab-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private coreSocket: CoreSocketService,
    private dashService: DashboardService,
  ) { }

  public logout() {
    this.authService.logout()
      .then(() => {
        this.coreSocket.disconnect();
        this.router.navigateByUrl('login');
      })
      .catch(err => console.log(err));
  }

  public sendTest() {
    this.dashService.sendTest();
  }

  ngOnInit(): void {
    this.coreSocket.initializeSocket();
  }

}
