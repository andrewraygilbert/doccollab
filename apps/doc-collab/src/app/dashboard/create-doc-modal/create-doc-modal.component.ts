import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateDocDto } from '@doccollab/api-interfaces';

let modal: any;

@Component({
  selector: 'doccollab-create-doc-modal',
  templateUrl: './create-doc-modal.component.html',
  styleUrls: ['./create-doc-modal.component.css']
})
export class CreateDocModalComponent implements OnInit {

  @ViewChild('createDocModal', { static: false }) createDocModal: ElementRef;

  @Output() outCreateDoc: EventEmitter<CreateDocDto> = new EventEmitter<CreateDocDto>();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { }

  public newDocForm = this.fb.group({
    title: ['', Validators.required]
  });

  private createDoc(newDoc: CreateDocDto) {
    this.outCreateDoc.emit(newDoc);
    modal.close();
    this.newDocForm.get('title')?.setValue('');
  }

  public open() {
    modal = this.modalService.open(this.createDocModal, { size: 'lg' });
  }

  public onSubmit() {
    const newDoc = {
      title: this.newDocForm.get('title')!.value
    };
    this.createDoc(newDoc);
  }

  ngOnInit(): void {
  }

}
