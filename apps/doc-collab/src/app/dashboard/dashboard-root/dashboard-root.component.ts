import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { CoreSocketService } from './../../socket/core-socket.service';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';
import { AppDocBase } from '@doccollab/api-interfaces';
import { CreateDocDto } from '@doccollab/api-interfaces';

@Component({
  selector: 'doccollab-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit, OnDestroy {

  private newDocument$: any;
  private returnDocuments$: any;
  public myDocuments: AppDocBase[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private coreSocket: CoreSocketService,
    private dashService: DashboardService,
  ) { }

  /**
   * Actions
   */

  public logout() {
    this.authService.logout()
      .then(() => {
        this.coreSocket.disconnect();
        this.router.navigateByUrl('login');
      })
      .catch(err => console.log(err));
  }

  public createDoc(newDoc: CreateDocDto) {
    this.dashService.createDoc(newDoc);
  }

  public getDocuments() {
    this.dashService.getDocuments();
  }

  /**
   * EVENTS FROM SERVER
   */

  private onNewDocument(doc: AppDocBase) {
    console.log('here it is', doc);
    this.myDocuments.push(doc);
  }

  /**
   * Initialization
   */

  private initializeSubscriptions() {
    this.newDocument$ = this.dashService.newDocument$()
      .subscribe((newDoc: AppDocBase) => {
        this.onNewDocument(newDoc);
      });
    this.returnDocuments$ = this.dashService.returnDocuments$()
      .subscribe((docs) => {
        this.myDocuments = docs;
      });
  }

  /**
   * Lifecycle Hooks
   */

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('login');
    } else {
      this.coreSocket.initializeSocket();
      this.initializeSubscriptions();
      this.getDocuments();
    }
  }

  ngOnDestroy(): void {
    this.newDocument$.unsubscribe();
  }

}
