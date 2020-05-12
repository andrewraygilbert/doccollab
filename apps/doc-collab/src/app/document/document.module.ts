import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocRootComponent } from './doc-root/doc-root.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DocRootComponent],
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    RouterModule,
  ]
})
export class DocumentModule { }
