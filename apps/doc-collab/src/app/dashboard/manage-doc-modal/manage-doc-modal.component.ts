import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard.service';
import { AppDoc } from '@doccollab/api-interfaces';
import { Subscription } from 'rxjs';

let modal: any;

@Component({
  selector: 'doccollab-manage-doc-modal',
  templateUrl: './manage-doc-modal.component.html',
  styleUrls: ['./manage-doc-modal.component.css']
})
export class ManageDocModalComponent implements OnInit, OnDestroy {

  @ViewChild('manageDocModal', {static: false}) manageDocModal: ElementRef

  public doc: AppDoc;
  public addCollaborator$: Subscription;
  public collabForm = this.fb.group({
    username: ['', Validators.required]
  });

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dashService: DashboardService,
  ) { }

  public onCollabSubmit() {
    const dto = {
      username: this.collabForm.get('username')!.value,
      docId: this.doc._id
    };
    this.dashService.addCollaborator(dto);
  }

  // open the modal
  public open(doc: AppDoc) {
    console.log('doc', doc);
    this.doc = doc;
    modal = this.modalService.open(this.manageDocModal, { size: 'lg' });
  }

  /**
   * INITIALIZATION
   */

  private initializeSubscriptions() {
    this.addCollaborator$ = this.dashService.addCollabRes$()
      .subscribe((collab) => {
        console.log('collab', collab);
        this.doc.collaborators.push(collab);
        this.collabForm.get('username')?.setValue('');
      });
  }

  /**
   * LIFECYCLE HOOKS
   */

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.addCollaborator$.unsubscribe();
  }

}
