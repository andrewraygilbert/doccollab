import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocModalComponent } from './manage-doc-modal.component';

describe('ManageDocModalComponent', () => {
  let component: ManageDocModalComponent;
  let fixture: ComponentFixture<ManageDocModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
