import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { CoreSocketService } from './../../socket/core-socket.service';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';
import { AppDocument } from '@doccollab/api-interfaces';
import { CreateDocDto } from '@doccollab/api-interfaces';

@Component({
  selector: 'doccollab-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit, OnDestroy {

  private newDocument$: any;
  private returnDocuments$: any;
  public myDocuments: AppDocument[] = [];
  public collabDocs: AppDocument[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private coreSocket: CoreSocketService,
    private dashService: DashboardService,
  ) { }

  /**
   * LOCAL ACTIONS
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

  public openDocument(docId: string) {
    this.router.navigateByUrl(`document/${docId}`);
  }

  /**
   * EVENTS FROM SERVER
   */

  private onNewDocument(doc: AppDocument) {
    console.log('here it is', doc);
    this.myDocuments.push(doc);
  }

  /**
   * INITIALIZATION
   */

  private initializeSubscriptions() {
    this.newDocument$ = this.dashService.newDocument$()
      .subscribe((newDoc: AppDocument) => {
        this.onNewDocument(newDoc);
      });
    this.returnDocuments$ = this.dashService.returnDocuments$()
      .subscribe((docs: any) => {
        this.myDocuments = docs.ownDocs;
        this.collabDocs = docs.collabDocs;
        console.log(docs);
      });
  }

  /**
   * LIFECYCLE HOOKS
   */

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('login');
    } else {
      if (!this.coreSocket.socket) {
        this.coreSocket.initializeSocket();
      }
      this.initializeSubscriptions();
      this.getDocuments();
    }
  }

  ngOnDestroy(): void {
    this.newDocument$.unsubscribe();
  }

}
