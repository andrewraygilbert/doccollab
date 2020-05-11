import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocRootComponent } from './doc-root/doc-root.component';
import { CreateDocModalComponent } from './create-doc-modal/create-doc-modal.component';



@NgModule({
  declarations: [DocRootComponent, CreateDocModalComponent],
  imports: [
    CommonModule
  ]
})
export class DocumentModule { }
