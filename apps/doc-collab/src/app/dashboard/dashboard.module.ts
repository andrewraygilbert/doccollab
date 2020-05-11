import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { CreateDocModalComponent } from './create-doc-modal/create-doc-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardRootComponent, CreateDocModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
